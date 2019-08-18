import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import moment from 'moment';
import * as styles from './TaskShow.module.css';
import InputValidate from '../form/InputValidate';
import { updateTask } from "../../actions/tasks-actions";
import iconEdit from './edit.svg';
import iconDelete from './delete.svg';

const TaskShow = ({ task: { _id, body, due }}) => {
  const dispatch = useDispatch();
  const [localBody, setLocalBody] = useState(body);
  const [localDue, setLocalDue] = useState(!!due ? due : '');
  const [isEditing, setEditing] = useState(false);
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
      <td><input type="checkbox" /></td>
      <td>
        {!isEditing && localBody}
        <InputValidate type="text" value={localBody} ref={bodyRef}
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
        <InputValidate type="date" value={localDue} ref={dueRef}
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
        />
        <img style={iconStyle} alt="Delete task" title="Delete task"
          src={iconDelete}
        />
      </td>
    </tr>
};

const iconStyle = { width: '16px', height: '16px' };

export default TaskShow;
