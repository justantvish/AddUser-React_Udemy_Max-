import React, {useState} from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ErrorModal from "../UI/ErrorModal/ErrorModal";

import styles from './AddUser.module.css';

const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (e) => {
        e.preventDefault();
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 || +enteredAge < 1) {
            setError({
                title: 'Invalid input',
                message: 'Please, enter a valid name and age (non-empty values).'
            });
            return;
        }

        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    };

    const usernameChangeHandler = e => {
        setEnteredUsername(e.target.value);
    }

    const ageChangeHandler = e => {
        setEnteredAge(e.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={styles.input}>
                <form className={styles.form} onSubmit={addUserHandler}>
                    <label htmlFor="username" >Username</label>
                    <input
                        id="username"
                        type="text"
                        value={enteredUsername}
                        onChange={usernameChangeHandler}
                    />
                    <label htmlFor="age" >Age (years)</label>
                    <input
                        id="age"
                        type="number"
                        value={enteredAge}
                        onChange={ageChangeHandler}
                    />
                    <Button type="submit">Add user</Button>
                </form>
            </Card>
        </>
    );
};

export default AddUser;
