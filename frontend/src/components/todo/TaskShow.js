import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import moment from 'moment';
import * as styles from './TaskShow.module.css';
import InputValidate from '../form/InputValidate';
import TaskDelete from './TaskDelete';
import { updateTask, receiveTask } from "../../actions/tasks-actions";
import iconEdit from './edit.svg';
import iconDelete from './delete.svg';

const TaskShow = ({ task: { _id, body, due, status }}) => {
  const dispatch = useDispatch();
  const [localBody, setLocalBody] = useState(body);
  const [localDue, setLocalDue] = useState(!!due ? due : '');
  const [isChecked, setIsChecked] = useState(status === 'done');
  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const bodyRef = useRef(null);
  const dueRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      bodyRef.current.focus();
    }
  }, [isEditing, bodyRef]);

  const [, setEditMode] = useState(null);
  const exitEditMode = (bool) => () => {
    setEditMode((exitCallback) => {
      if (bool) {
        return exitCallback ?
          exitCallback :
          setTimeout(() => {
            setEditing(false);
            if (!localBody) {
              setLocalBody(body);
            } else {
              const newDue = !!localDue ? localDue : null;
              dispatch(updateTask({ _id, body: localBody, due: newDue }));
            }
          }, 100);
      } else {
        return clearTimeout(exitCallback);
      }
    });
  };

  const inputProps = {
    style: isEditing ? {} : { display: 'none' },
    onFocus: exitEditMode(false),
    onBlur: exitEditMode(true),
  };

  return <tr key={_id} className={styles.row}>
      <td>
        <input type="checkbox" className={styles.checkbox} checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            const newTask = {
              _id,
              body: !!localBody ? localBody : body,
              due: !!localDue ? localDue : due,
              status: e.target.checked ? 'done' : 'open'
            };
            dispatch(receiveTask(newTask));
            dispatch(updateTask(newTask));
          }}
        />
      </td>
      <td>
        {!isEditing && localBody}
        <InputValidate type="text" ref={bodyRef} value={localBody}
          className={styles.body}
          onChange={(e) => setLocalBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              bodyRef.current.blur();
            }
          }}
          {...inputProps}
        />
      </td>
      <td>
        {!isEditing && (localDue && moment(localDue).format('Y/M/D'))}
        <InputValidate type="date" ref={dueRef}
          value={localDue && moment(localDue).format('YYYY-MM-DD')}
          className={styles.due}
          onChange={(e) => setLocalDue(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              dueRef.current.blur();
            }
          }}
          {...inputProps}
        />
      </td>
      <td>
        <img style={iconStyle} alt="Edit task" title="Edit task"
          src={iconEdit} onClick={() => setEditing(true)}
          className={styles.icon}
        />
        <img style={iconStyle} alt="Delete task" title="Delete task"
          src={iconDelete} onClick={() => setDeleting(true)}
          className={styles.icon}
        />
        <TaskDelete open={isDeleting} close={() => setDeleting(false)}
          _id={_id} body={body}
        />
      </td>
    </tr>
};

const iconStyle = { width: '16px', height: '16px' };

export default TaskShow;
