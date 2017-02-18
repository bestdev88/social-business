import React from 'react';

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateFile = this.updateFile.bind(this);

    this.state = this.props.project || {title: "", subtitle: "", body: "",
      end_date: Date.now() , category: "", location: ""};
  }

  renderErrors() {
		return(
			<ul>
				{this.props.errors.map((error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}


  componentWillReceiveProps(newProps) {
    this.setState(newProps.project || {title: "", subtitle: "", body: "",
      end_date: Date.now() , category: "", location: "", imageFile: null, imageURL: null});
  }


  handleSubmit(e){
    e.preventDefault();
    let formData = new FormData();
    formData.append("project[title]", this.state.title);
    formData.append("project[subtitle]", this.state.subtitle);
    formData.append("project[body]", this.state.body);
    formData.append("project[end_date]", this.state.end_date);
    formData.append("project[category]", this.state.category);
    formData.append("project[end_date]", this.state.end_date);
    formData.append("project[location]", this.state.location);
    formData.append("project[image]", this.state.imageFile);

    this.props.processForm(formData);
  }

  handleChange(e) {
    this.setState({category: e.target.value});
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  updateFile(e) {
		let file = e.currentTarget.files[0];
		var fileReader = new FileReader();
		fileReader.onloadend = function () {
			this.setState({ imageFile: file, imageUrl: fileReader.result });
		}.bind(this);

		if (file) {
			fileReader.readAsDataURL(file);
		}
	}

  render() {

    return(
      <div>
        <h1>Project Form!</h1>
        <form onSubmit={this.handleSubmit}>
          <h1 id="title">{this.props.formType}</h1>
          {this.renderErrors()}
          <div className="projects-form">
            <input type="text"
              value={this.state.title}
              onChange={this.update("title")}
              className="project-input"
              placeholder="Project Title" />
            <br/>
            <input type="text"
              value={this.state.subtitle}
              onChange={this.update("subtitle")}
              className="project-input"
              placeholder="Subtitle" />
              <br/>
    					<input type="file" onChange={this.updateFile}
    						className="form-box" id='photo-upload-btn'/>
    					<div className='something-for-styling guest-button form-box' onClick={() => document.querySelector('#photo-upload-btn').click()}>
    						Upload Your Photo
    					</div>
    					<img className='user-uploaded-photo' src={this.state.imageUrl} />
            <br/>
              <select value={this.state.category} onChange={this.handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option selected defaultValue="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
            <br/>
            <input type="text"
              value={this.state.location}
              onChange={this.update("location")}
              className="project-input"
              placeholder="Location" />
            <br/>
            <input type="date"
              value={this.state.end_date}
              onChange={this.update("end_date")}
              className="project-input"/>
            <br/>
            <input type="textarea"
              value={this.state.body}
              onChange={this.update("body")}
              className="project-input"
              placeholder="Add your projects description here" />
            <br/>
            <input className="projects-form" type="submit" value={this.props.handleSubmit} />
          </div>
        </form>
      </div>
    );
  }

}

export default ProjectForm;
