import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const stories = (state = initialState.stories, action) => {
    switch (action.type) {
        case types.stories.GET:
            return action.stories;
        default:
            return state;
    }
};

export const story = (state = initialState.story, action) => {
    switch (action.type) {
        case types.stories.CREATE:
            return action.story;
        default:
            return state;
    }
};
