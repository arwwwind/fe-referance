import React from 'react';
import ReactQuill from 'react-quill';

class TextEditor extends React.Component {
  state = { editorHtml: '' };

  handleChange = (html) => {
    this.setState({ editorHtml: html });
    this.props.onChange(html);
  };

  render() {
    return (
      <ReactQuill
        value={this.state.editorHtml}
        onChange={this.handleChange}
        modules={
          {
            toolbar: [
              ['bold', 'italic'],
              [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ]
          }
        }
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default TextEditor;
