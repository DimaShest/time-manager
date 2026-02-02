import { HTTP_METHOD } from './constants';

const fetchServerProjects = (method, project = null) => {
	let url = 'http://localhost:3005/projects';
	let options = {};

	if (method === HTTP_METHOD.GET) {
		options = null;

		if (project?.id) url += `/${String(project.id)}`;
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
	if (method === HTTP_METHOD.PATCH) {
		url += `/${String(project.id)}`;
		options = {
			method,
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(project),
		};
	}

	return fetch(url, options).then((response) => {
		const res = response.json();
		return res;
	});
};

export const getProjects = () => fetchServerProjects(HTTP_METHOD.GET);
export const getProjectById = (id) => fetchServerProjects(HTTP_METHOD.GET, { id });
export const addProject = (project) => fetchServerProjects(HTTP_METHOD.POST, project);
export const updateProject = (project) => fetchServerProjects(HTTP_METHOD.PATCH, project);
export const deleteProject = (id) => fetchServerProjects(HTTP_METHOD.DELETE, { id });
