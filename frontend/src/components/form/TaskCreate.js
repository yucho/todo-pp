import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './TaskCreate.module.css';
import InputValidate from './InputValidate';
import { createTask } from "../../actions/tasks-actions";

const TaskCreate = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState('');
  const [due, setDue] = useState('');
  const [open, setOpen] = useState(false);
  const textInput = useRef(null);

  useEffect(() => {
    if (open) {
      textInput.current.focus();
    }
  }, [open])

  return <section>
      <div
        className={styles.add} 
        style={!open ? {} : { display: 'none' }}
        onClick={() => setOpen(true)}
      >
        <span className={styles.plus}>&#xff0b;</span> Add Task
      </div>
      <form
        style={open ? {} : { display: 'none' }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!body) {
            setOpen(false);
          } else {
            dispatch(createTask({ body, due }));
          }
          setBody('');
          setDue('');
        }}>
      <InputValidate
        type="text" value={body} className={styles.text} ref={textInput}
        placeholder="Let's get productive!"
        onChange={(e) => setBody(e.target.value)}
      />
      <label>
        Due: <InputValidate type="date" value={due} className={styles.date}
          onChange={(e) => setDue(e.target.value)}
        />
      </label>
      <input type="submit" value="Create Task" className={styles.submit} />
      <input type="button" value="Cancel" className={styles.cancel}
        onClick={() => {
          setOpen(false);
          setBody('');
          setDue('');
        }}
      />
    </form>
  </section>
};

export default TaskCreate;
