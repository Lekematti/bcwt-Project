'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const userList = document.querySelector('.add-owner');

// submit add cat form
const addForm = document.querySelector('#addPost');

addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
    };
    const response = await fetch(url + '/post', fetchOptions);
    const json = await response.json();
    alert(json.message);
    location.href = 'userView.html';
});

const ul = document.querySelector('#list');

// create post cards
const createPostCards = (posts) => {
    // clear ul
    ul.innerHTML = '';
    posts.forEach((post) => {
        // create li with DOM methods
        const img = document.createElement('img');
        img.src ='../uploads/' + post.filename;
        img.alt = post.name;
        img.classList.add('resp');

        const figure = document.createElement('figure').appendChild(img);


        const h2 = document.createElement('h2');
        h2.innerHTML = post.title;

        const p1 = document.createElement('p');
        p1.innerHTML = `${post.content}`;

        // delete selected post
        const delButton = document.createElement('button');
        delButton.innerHTML = 'Delete';
        delButton.classList.add('button');
        delButton.addEventListener('click', async () => {
            const fetchOptions = {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            try {
                const response = await fetch(url + '/post/' + post.Id, fetchOptions);
                const json = await response.json();
                console.log("rabadababuu",post);
                console.log('delete response', json);
                getPost();
            } catch (e) {
                console.log(e.message);
            }
        });

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(delButton);
        ul.appendChild(li);
        if (user.u_Id === message.user_Id) {

            // delete selected cat
            const delButton = document.createElement('button');
            delButton.innerHTML = 'Delete';
            delButton.classList.add('button');
            delButton.addEventListener('click', async () => {
                const fetchOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    },
                };
                try {
                    const response = await fetch(
                        url + '/post/' + message.m_Id,
                        fetchOptions
                    );
                    const json = await response.json();
                    console.log('delete response', json);
                    getPost();
                } catch (e) {
                    console.log(e.message);
                }
            });

            li.appendChild(delButton);
        }
    });
};


// AJAX call
const getPost = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/post', fetchOptions);
        const post = await response.json();
        console.log("jabadabaduu",post);
        createPostCards(post);
    } catch (e) {
        console.log(e.message);
    }
};
getPost();
