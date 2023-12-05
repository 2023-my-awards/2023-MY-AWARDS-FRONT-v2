import React from 'react';
import '../css/Posting.css';
import ResetIcon from '/images/reset.png';

class CustomFileInputButton extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      selectedImages: [],
    };
  }

  handleImageClick = () => {
    this.fileInputRef.current.click();
  };

  // 이미지 삭제
  handleDeleteImage = event => {
    event.preventDefault();
    this.setState(
      prevState => {
        const updatedImages = [];
        // 현재 선택된 이미지 중 삭제하지 않을 이미지들만 filteredImages에 추가
        prevState.selectedImages.forEach((image, index) => {
          if (index !== 0) {
            // 첫 번째 이미지를 유지하고 나머지는 제거
            updatedImages.push(image);
          }
        });
        return { selectedImages: updatedImages };
      },
      () => {
        this.props.onImageChange(this.state.selectedImages);
      }
    );
  };

  handleFileChange = e => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files).map(file =>
        URL.createObjectURL(file)
      );

      this.setState(
        prevState => ({
          selectedImages: [...prevState.selectedImages, ...newImages].slice(
            0,
            2
          ),
        }),
        () => {
          this.props.onImageChange(this.state.selectedImages);
          // 추가된 부분: 이미지가 2장 이상이면 onShowModal 콜백 호출
          // if (this.state.selectedImages.length >= 2) {
          //   this.props.onShowModal();
          // }
        }
      );
    }
  };

  render() {
    return (
      <div>
        {/* 삭제 버튼 */}
        <div id="wrapper">
          <label
            htmlFor="input_photo"
            id="filelabel"
            onClick={this.handleImageClick}
          >
            사진 첨부
          </label>
          <input
            id="input_photo"
            type="file"
            style={{ display: 'none' }}
            ref={this.fileInputRef}
            onChange={this.handleFileChange}
            multiple
          />
          <img
            src={'/images/inputfile.png'}
            alt="사진첨부 버튼"
            id="inputfileimg"
            style={{ cursor: 'pointer' }}
            onClick={this.handleImageClick}
          />
          <img id="reset" src={ResetIcon} onClick={this.handleDeleteImage} />
        </div>
        {this.state.selectedImages.length > 0 && (
          <div id="selected_container">
            {this.state.selectedImages.map((image, index) => (
              <div id="selected_div" key={index}>
                <img
                  id="selected_img"
                  src={image}
                  alt={`선택된 이미지 ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CustomFileInputButton;
