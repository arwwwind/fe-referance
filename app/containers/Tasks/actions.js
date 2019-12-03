import { TASK_CHECKED } from './constants';

/**
 * Update task checked action creator
 * @function singleTaskError
 * @param {Object} task - object task
 * @returns {Object} task checked action
 */
export function taskChecked(task) {
  return {
    type: TASK_CHECKED,
    task
  };
}
