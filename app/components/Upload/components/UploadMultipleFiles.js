import React from 'react';
import { Upload, Button, Icon } from 'antd';
import { validateFile, fileTypes, fileMaxSize } from '../config';

class UploadMultipleFiles extends React.Component {
  state = {
    fileList: [],
    existingFiles: this.props.files,
    removeFileList: []
  };

  onChange = (files) => {
    if (this.props.onChange) {
      this.props.onChange(files);
    }
  };

  onRemoveFile = (file) => {
    this.setState(({ fileList }) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      this.onChange(newFileList);
      return {
        fileList: newFileList
      };
    });
  };

  removeList = (list) => {
    if (this.props.removeList) {
      this.props.removeList(list);
    }
  };

  checkExistingFiles = () => {
    const files = this.state.existingFiles;
    if (files && files.length) {
      return (
        <ul className="existing-files-list">
          <li>Existing Files</li>
          {files.map((file) => (
            <li key={file.id} title={file.fileName}>
              <Icon type="paper-clip" theme="outlined" />
              <div>{file.fileName}</div>
              <a href="#" title="Remove file" onClick={this.removeExistingFile(file)}>
                <Icon type="cross" theme="outlined" />
              </a>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  removeExistingFile = (file) => (e) => {
    e.preventDefault();

    this.setState(({ removeFileList }) => {
      const newRemoveFileList = [...removeFileList, file];
      this.removeList(newRemoveFileList);
      return {
        removeFileList: newRemoveFileList
      };
    });

    this.setState(({ existingFiles }) => {
      const index = existingFiles.indexOf(file);
      const newExistingFiles = existingFiles.slice();
      newExistingFiles.splice(index, 1);
      return {
        existingFiles: newExistingFiles
      };
    });
  };

  beforeUpload = (file) => {
    if (validateFile(file, fileTypes, fileMaxSize)) {
      this.setState(({ fileList }) => {
        const newFileList = [...fileList, file];
        this.onChange(newFileList);
        return {
          fileList: newFileList
        };
      });
    }
    return false;
  };

  render() {
    const props = {
      multiple: true,
      onRemove: this.onRemoveFile,
      beforeUpload: this.beforeUpload,
      fileList: this.state.fileList
    };

    return (
      <div>
        <Upload {...props}>
          <Button type="primary">
            <Icon type="upload" /> Select Files
          </Button>
        </Upload>
        {this.checkExistingFiles()}
      </div>
    );
  }
}

export default UploadMultipleFiles;
