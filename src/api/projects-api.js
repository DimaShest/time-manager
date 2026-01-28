import { HTTP_METHOD } from './constants';

const fetchServerProjects = (method, project = null) => {
	let url = 'http://localhost:3005/projects';
	let options = {};

	if (method === HTTP_METHOD.GET) {
		options = null;
	}

	if (method === HTTP_METHOD.DELETE) {
		url += `/${String(project.id)}`;
		options = { method };
	}

	if (method === HTTP_METHOD.POST) {
		options = {
			method,
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(project),
		};
	}
	if (method === HTTP_METHOD.PUT) {
		url += `/${String(project.id)}`;
		options = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(project),
		};
	}

	return fetch(url, options).then((response) => response.json());
};

export const getProjects = () => fetchServerProjects(HTTP_METHOD.GET);
export const addProject = (project) => fetchServerProjects(HTTP_METHOD.POST, project);
export const updateProject = (project) => fetchServerProjects(HTTP_METHOD.PUT, project);
export const deleteProject = (id) => fetchServerProjects(HTTP_METHOD.DELETE, { id });
