import includes from 'lodash/includes';
import isString from 'lodash/isString';
import upperCase from 'lodash/upperCase';
import { notification } from 'antd';

export const imageTypes = ['JPG', 'PNG', 'GIF', 'BMP'];
export const imageMaxSize = 2; // MB

export const fileTypes = ['PDF', 'DOC', 'DOCX', ...imageTypes];
export const fileMaxSize = 10; // MB

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const getFileExtenstion = (fileName) => {
  if (fileName && isString(fileName)) {
    return upperCase(fileName.split('.').pop());
  }
  return null;
};

export const validateFile = (file, allowedTypes, maxSize) => {
  if (!includes(allowedTypes, getFileExtenstion(file.name))) {
    notification.error({
      key: 'upload_error',
      message: 'Upload error',
      description: `You can only upload ${allowedTypes.join(', ')}`
    });
    return false;
  }
  if (file.size / 1024 / 1024 > maxSize) {
    notification.error({
      key: 'upload_error',
      message: 'Upload error',
      description: `File must be smaller than ${maxSize}MB`
    });
    return false;
  }
  return true;
};
