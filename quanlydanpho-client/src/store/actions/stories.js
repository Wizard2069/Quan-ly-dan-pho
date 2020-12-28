import * as types from '../constants/types';
import {createStoryData, getStoriesData} from '../../api/stories';
import {clearError, createError} from './error';

export const getStories = (stories) => {
    return {
        type: types.stories.GET,
        stories
    };
};

export const createStory = (story) => {
    return {
        type: types.stories.CREATE,
        story
    };
};

export const getStoriesByPersonId = (personId, page = 1, limit = 10) => {
    return dispatch => {
        getStoriesData(personId, page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getStories(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createStoryByPersonId = (personId, storyDto) => {
    return dispatch => {
        createStoryData(personId, storyDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createStory(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
