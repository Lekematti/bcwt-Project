'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const ul = document.querySelector('#list');

// create cat cards
const createPostCards = (posts) => {
    // clear ul
    ul.innerHTML = '';
    posts.forEach((post) => {
        // create li with DOM methods
        const img = document.createElement('img');
        img.src = url + '/' + post.filename;
        img.alt = post.name;
        img.classList.add('resp');

        const figure = document.createElement('figure').appendChild(img);

        const h2 = document.createElement('h2');
        h2.innerHTML = post.name;

        const p1 = document.createElement('p');
        p1.innerHTML = `Timestamp: ${post.timeStamp}`;

        const p2 = document.createElement('p');
        p2.innerHTML = `text: ${post.content}p`;

        const p3 = document.createElement('p');
        p3.innerHTML = `Username: ${post.username}`;

        // add modify button
        // const modButton = document.createElement('a');
        // modButton.innerHTML = 'Modify';
        // modButton.href = `modify-cat.html?id=${post.Id}`;
        // modButton.classList.add('button');
        //
        // // delete selected cat
        // const delButton = document.createElement('button');
        // delButton.innerHTML = 'Delete';
        // delButton.classList.add('button');
        // delButton.addEventListener('click', async () => {
        //     const fetchOptions = {
        //         method: 'DELETE',
        //         headers: {
        //             Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        //         },
        //     };
        //     try {
        //         const response = await fetch(url + '/cat/' + cat.cat_id, fetchOptions);
        //         const json = await response.json();
        //         console.log('delete response', json);
        //         getCat();
        //     } catch (e) {
        //         console.log(e.message);
        //     }
        // });

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        //li.appendChild(modButton);
        //li.appendChild(delButton);
        ul.appendChild(li);
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
        createPostCards(post);
    } catch (e) {
        console.log(e.message);
    }
};
getPost();