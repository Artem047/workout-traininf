import React, { useState, useRef } from "react";

const AddExerciseForm = ({ onAddExercise }) => {
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    media: null,
    mediaType: null,
    mediaUrl: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Проверка типа файла
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Пожалуйста, загрузите изображение или видео");
      return;
    }

    // Проверка размера (макс 50MB для видео, 10MB для фото)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(
        `Файл слишком большой. Максимальный размер: ${isVideo ? "50MB" : "10MB"}`,
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result);
      setNewExercise({
        ...newExercise,
        media: reader.result,
        mediaType: isImage ? "image" : "video",
        mediaUrl: "",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUrlAdd = (url) => {
    // Проверка URL на YouTube, Vimeo или прямые ссылки
    const isYouTube =
      url.includes("youtube.com/watch") || url.includes("youtu.be");
    const isVimeo = url.includes("vimeo.com");
    const isDirectImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    const isDirectVideo = /\.(mp4|webm|mov)$/i.test(url);

    if (isYouTube || isVimeo || isDirectImage || isDirectVideo) {
      setMediaPreview(url);
      setNewExercise({
        ...newExercise,
        media: url,
        mediaType:
          isYouTube || isVimeo ? "embed" : isDirectImage ? "image" : "video",
        mediaUrl: url,
      });
    } else {
      alert(
        "Пожалуйста, введите корректную ссылку на YouTube, Vimeo или прямое изображение/видео",
      );
    }
  };

  const removeMedia = () => {
    setMediaPreview(null);
    setNewExercise({
      ...newExercise,
      media: null,
      mediaType: null,
      mediaUrl: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newExercise.name || !newExercise.sets || !newExercise.reps) return;

    onAddExercise({
      id: Date.now(),
      name: newExercise.name,
      sets: parseInt(newExercise.sets),
      reps: parseInt(newExercise.reps),
      completedSets: 0,
      completed: false,
      createdAt: new Date().toLocaleTimeString(),
      media: newExercise.media,
      mediaType: newExercise.mediaType,
    });

    setNewExercise({
      name: "",
      sets: "",
      reps: "",
      media: null,
      mediaType: null,
      mediaUrl: "",
    });
    setMediaPreview(null);
    setIsFormVisible(false);
  };

  return (
    <div className="add-exercise-wrapper">
      <button
        className="toggle-exercise-form-btn"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "− Скрыть" : "+ Добавить упражнение"}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="add-exercise-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Название упражнения"
              value={newExercise.name}
              onChange={(e) =>
                setNewExercise({ ...newExercise, name: e.target.value })
              }
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="number"
                placeholder="Подходы"
                value={newExercise.sets}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, sets: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Повторения"
                value={newExercise.reps}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, reps: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Медиа секция */}
          <div className="form-group">
            <label className="form-label">
              📷 Фото или видео (необязательно)
            </label>
            <div className="media-upload-section">
              <div className="media-buttons">
                <button
                  type="button"
                  className="btn-media"
                  onClick={() => fileInputRef.current.click()}
                >
                  📁 Загрузить файл
                </button>
                <button
                  type="button"
                  className="btn-media"
                  onClick={() => {
                    const url = prompt(
                      "Вставьте ссылку на YouTube, Vimeo или изображение:",
                    );
                    if (url) handleUrlAdd(url);
                  }}
                >
                  🔗 Добавить по ссылке
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                style={{ display: "none" }}
              />

              {mediaPreview && (
                <div className="media-preview">
                  <div className="media-preview-header">
                    <span>Предпросмотр:</span>
                    <button
                      type="button"
                      onClick={removeMedia}
                      className="btn-remove-media"
                    >
                      ✕
                    </button>
                  </div>
                  {newExercise.mediaType === "image" && (
                    <img
                      src={mediaPreview}
                      alt="Preview"
                      className="preview-image"
                    />
                  )}
                  {newExercise.mediaType === "video" && (
                    <video
                      src={mediaPreview}
                      controls
                      className="preview-video"
                    />
                  )}
                  {newExercise.mediaType === "embed" && (
                    <div className="embed-preview">
                      <iframe
                        src={mediaPreview.replace("watch?v=", "embed/")}
                        title="Video preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary btn-full">
            Добавить упражнение
          </button>
        </form>
      )}
    </div>
  );
};

export default AddExerciseForm;
