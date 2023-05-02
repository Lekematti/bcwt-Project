'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const user = JSON.parse(sessionStorage.getItem('user'));

// select existing html elements
const userList = document.querySelector('.add-owner');

// submit add post form
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

let ul = document.querySelector('#list');

let img, figure, h3, p1, delButton, li;
let fetchOptions, response, json;
// create post cards
const createPostCards = (posts) => {
    console.log("input:" , posts);
    // clear ul
    ul.innerHTML = '';
    posts.forEach( (post) => {
        // create li with DOM methods
        img = document.createElement('img');
        img.src ='../uploads/' + post.filename;
        img.alt = post.name;
        img.classList.add('resp');

        figure = document.createElement('figure').appendChild(img);


        h3 = document.createElement('h3');
        h3.innerHTML = `${post.title}`;

        p1 = document.createElement('p');
        p1.innerHTML = `${post.content}`;

        // delete selected post
        delButton = document.createElement('button');
        delButton.innerHTML = 'Delete';
        delButton.classList.add('button');
        delButton.addEventListener('click', async () => {
            fetchOptions = {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            try {
                response = await fetch(url + '/post/' + post.m_Id, fetchOptions);
                json = await response.json();
                console.log()
                console.log("rabadababuu",post);
                console.log('delete response', json);
                getPost();
            } catch (e) {
                console.log(e.message);
            }
        });

        li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h3);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(delButton);
        ul.appendChild(li);
        console.log("Appeneded li to ul");

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
