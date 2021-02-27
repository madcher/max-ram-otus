// функция авторизации
const loginFunc = (e, setToken, setError) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const login = data.get('login');
    const password = data.get('password');
    fetch('/api/authorization', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ login, password }),
    }).then(res => {
        if (!res.ok) {
            console.log("HTTP status " + res.status);
            throw Error;
        }
        return res.json();
    }).then(result => {
        setToken(result.token);
        setError(false);
    }).catch(err => {
        setError(true);
        console.log(err)
    });
};

// получение курсов
const getCourse = (setCourses, token) => {
    fetch('/api/get-courses', {
        method: 'GET',
        headers: {'token': token}
    }).then(response => response.json()).then(data => {
        setCourses(data);
    }).catch(err => console.log(err));
}
// добавление курсов
const addCourse = (query, setCourses, token) => {
    fetch('/api/add-course', {
        method: 'POST',
        headers: {'token': token, 'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(query)
    }).then(res => {
        getCourse(setCourses, token);
    }).catch(err => console.log(err));
}
// удаление курса
const deleteCourse = (courseName, setCourses, token) => {
    fetch('/api/delete-course', {
        method: 'DELETE',
        headers: {'token': token, 'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({courseName})
    }).then(res => {
        getCourse(setCourses, token);
    }).catch(err => console.log(err));
}