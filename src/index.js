const URL = 'http://localhost:3000/posts';
let postList;


 function displayPosts(){
    const postList = document.getElementById("post-list");

   fetch(URL)
        .then(response => response.json())
        .then (data => {
            data.forEach(item => {
                const blog  = document.createElement('div');
                blog.classList.add("post-title");
                blog.dataset.id = item.id;
                blog.textContent = item.title;
                postList.appendChild(blog);

            });
        });

}

function handlePostClick (e){
    const postId = e.target.dataset.id;

    fetch(`${URL}/${postId}`)
    .then(response => response.json())
    .then (post => {
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-content").textContent = post.content;
        document.getElementById("post-author").textContent = post.author;
    });

}

function addNewPostListener (){
    const form = document.getElementById("new-post-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

    const addPost = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        content: document.getElementById("content").value,
        image: document.getElementById("image").value,
    };    
    // append to the DOM
    const postList = document.getElementById("post-list");
    const postItem = document.createElement("div");
    postItem.classList.add("post-title"); 
    

    const title = document.createElement("h3");
    title.textContent = addPost.title;
    
    const content = document.createElement("p");
    content.textContent = addPost.content;

    const author = document.createElement("small");
    author.textContent = `By: ${addPost.author}`;

    const img = document.createElement("img");
    img.src = addPost.image;
    img.alt = "Blog image";

    postItem.addEventListener("click", handlePostClick);

    postItem.appendChild(title);
    postItem.appendChild(content);
    postItem.appendChild(author);
    postItem.appendChild(img);

    postList.appendChild(postItem);

    });
    }

// Main function 
function main() {
  postList = document.getElementById("post-list");
  displayPosts();
  addNewPostListener();


  postList.addEventListener("click", (e) => {
    if (e.target.classList.contains("post-title")) {
      handlePostClick(e);
    }
  });
}
  //  Cancel button clears the form
  const cancelBtn = document.getElementById("cancel-btn");
  cancelBtn.addEventListener("click", () => {
    document.getElementById("new-post-form").reset();
  });

document.addEventListener("DOMContentLoaded", main);


