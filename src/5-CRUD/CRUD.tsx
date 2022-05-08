import { useState, useId } from "react";

import styles from "./CRUD.module.css";

interface User {
  id: string;
  name: string;
  surname: string;
}

let autoIncrementId = 0;

function createUser(name: string, surname: string): User {
  const id = String(autoIncrementId);
  autoIncrementId++;
  return { id, name, surname };
}

function getFullName(user: User) {
  return `${user.surname}, ${user.name}`;
}

export function CRUD() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");
  const [surnameInputValue, setSurnameInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [users, setUsers] = useState<User[]>([
    createUser("Hans", "Emil"),
    createUser("Max", "Mestermann"),
    createUser("Roman", "Tisch"),
  ]);

  const filteredUsers = users.filter((user) => {
    return getFullName(user)
      .toLocaleLowerCase()
      .includes(searchInputValue.trim().toLocaleLowerCase());
  });

  const selectedUser = filteredUsers[selectedIndex];

  const searchId = useId();
  const nameId = useId();
  const surnameId = useId();

  function handleCreate() {
    setUsers((prev) => [
      ...prev,
      createUser(nameInputValue, surnameInputValue),
    ]);
  }

  function handleUpdate() {
    setUsers((prev) => {
      return prev.map((user) => {
        return user.id === selectedUser?.id
          ? { name: nameInputValue, surname: surnameInputValue, id: user.id }
          : user;
      });
    });
  }

  function handleDelete() {
    setUsers((prev) => {
      return prev.filter((user) => user.id !== selectedUser?.id);
    });
  }

  return (
    <>
      <h2>5. CRUD</h2>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.topHalf}>
            <label htmlFor={searchId}>Search users:</label>
            <input
              id={searchId}
              type="text"
              onChange={(event) => setSearchInputValue(event.target.value)}
            />
          </div>
          <div className={styles.topHalf} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <select
              name="users"
              multiple
              value={[String(selectedIndex)]}
              onChange={(event) => {
                setSelectedIndex(parseInt(event.target.value));
              }}
            >
              {filteredUsers.map((user, i) => {
                return (
                  <option key={i} value={i}>
                    {getFullName(user)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.bottomRight}>
            <div className={styles.inputs}>
              <label htmlFor={nameId}>Name:</label>
              <input
                id={nameId}
                type="text"
                value={nameInputValue}
                onChange={(event) => setNameInputValue(event.target.value)}
              />
              <label htmlFor={surnameId}>Surname:</label>
              <input
                id={surnameId}
                type="text"
                value={surnameInputValue}
                onChange={(event) => setSurnameInputValue(event.target.value)}
              />
            </div>
            <div className={styles.buttonBar}>
              <button onClick={handleCreate}>Create</button>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <p>
        <a
          href="https://github.com/scwood/7guis"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
      </p>
    </>
  );
}
