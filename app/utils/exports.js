import axios from '../axios';

export const to = (entity) => (type) => {
  return axios({
    url: `exports/${entity}/${type}`,
    method: 'POST',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.style = 'display: none';
    link.setAttribute('download', `export.${type}`);
    document.body.appendChild(link);
    link.click();
  });
};

export const walkthroughWorksheet = (id) => {
  return axios({
    url: `exports/forms/walkthrough/${id}`,
    method: 'POST',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.style = 'display: none';
    link.setAttribute('download', 'WalkThrough_Worksheet.pdf');
    document.body.appendChild(link);
    link.click();
  });
};
