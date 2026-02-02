import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProjectThunk, updateProjectThunk } from '../../../../actions';
import { PageTitle } from '../../../../components';
import { Button, Input, Loader, Textarea } from '../../../../components/UI';
import { PROGRESS_DETERMINATION, PROJECT_PRIORITY, STATUS } from '../../../../constants';
import { getNameValidationError, getDescriptionValidationError } from './utils';
import styles from './project-form.module.css';

// ------(TODO) progress, timeSpent БУДУТ ДОБАВЛЯТЬСЯ НА СЕРВЕРЕ, А НЕ ЗДЕСЬ
const INITIAL_PROJECT = {
	id: null,
	name: '',
	description: '',
	progress: 0,
	timeComplete: 0,
	timeSpent: 0,
	priority: PROJECT_PRIORITY.LOW,
	progressDetemination: PROGRESS_DETERMINATION.TIME,
};

export const ProjectForm = ({ project = null, isEditing = false }) => {
	const [editableProject, setEditableProject] = useState(
		isEditing ? project : INITIAL_PROJECT,
	);
	const [validationError, setValidationError] = useState(null);

	const dispatch = useDispatch();
	const navigation = useNavigate();
	const status = useSelector(({ projects }) => projects.status);

	const onChange = (value, fieldName) =>
		setEditableProject((editableProject) => ({
			...editableProject,
			[fieldName]: value,
		}));

	const onCreateProject = async (e) => {
		e.preventDefault();
		const error =
			getNameValidationError(editableProject.name) ||
			getDescriptionValidationError(editableProject.description);

		if (error) {
			setValidationError(error);
			return;
		}

		setValidationError(null);

		if (isEditing) {
			await dispatch(updateProjectThunk(editableProject));
			navigation(`/project/${project.id}`);
		} else {
			await dispatch(createProjectThunk(editableProject));
			navigation('/projects');
		}
	};

	return (
		<form className={styles.projectForm} onSubmit={onCreateProject}>
			{(status === STATUS.CREATING || status === STATUS.UPDATING) && <Loader />}
			<PageTitle>
				{isEditing ? 'Редактирование проекта' : 'Создание нового проекта'}
			</PageTitle>
			<label className={styles.label} htmlFor="name">
				Название (обязательное):
			</label>
			<Input
				id="name"
				value={editableProject.name}
				type="text"
				onChange={({ target }) => onChange(target.value, 'name')}
			/>
			<label className={styles.label} htmlFor="description">
				Описание:
			</label>
			<Textarea
				id="description"
				value={editableProject.description}
				onChange={({ target }) => onChange(target.value, 'description')}
			/>
			<label className={styles.label} htmlFor="timeComplete">
				Время на выполнение (в часах):
			</label>
			<Input
				id="timeComplete"
				value={editableProject.timeComplete}
				type="number"
				onChange={({ target }) => onChange(Number(target.value), 'timeComplete')}
			/>
			<label className={styles.label} htmlFor="priority">
				Приоритет:
			</label>
			<select
				id="priority"
				value={editableProject.priority}
				onChange={({ target }) => onChange(target.value, 'priority')}
			>
				{Object.values(PROJECT_PRIORITY).map((priority) => (
					<option key={priority} value={priority}>
						{priority}
					</option>
				))}
			</select>
			<label className={styles.label} htmlFor="depenceProgress ">
				Как определяется прогресс:
			</label>
			<select
				id="depenceProgress"
				value={editableProject.depenceProgress}
				onChange={({ target }) => onChange(target.value, 'progressDetemination')}
			>
				{Object.values(PROGRESS_DETERMINATION).map((determination) => (
					<option key={determination} value={determination}>
						{determination}
					</option>
				))}
			</select>
			{!!validationError && (
				<label className={styles.error}>{validationError}</label>
			)}
			<Button
				className={styles.createBtn}
				type="submit"
				disabled={status === STATUS.CREATING || status === STATUS.UPDATING}
			>
				{isEditing ? 'Сохранить измения' : 'Создать'}
			</Button>
		</form>
	);
};
