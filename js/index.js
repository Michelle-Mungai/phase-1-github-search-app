const print = (value) => console.log(value);

// Global Variables
githubApi = "https://api.github.com/"
githubSearchApi = githubApi + "search/users?q=";

// Add event listener to submit button
document.querySelector('form').addEventListener('submit',searchFunction);

// function to execute when submit button is clicked
function searchFunction(e){
    e.preventDefault();
    const searchValue = e.target.querySelector('#search').value;

    fetch(`${githubSearchApi}${searchValue}`)
    .then(resp => resp.json())
    .then(printUsers)
}

function printUsers(data){
    print(data)
    const nameList = data.items;
    
    for(let account of nameList){
        // html_url and avatar_url
        // Create button to display username
        const header = document.createElement('button');
        header.textContent = account.login;

        // Create img element to display avatar
        const avatar = document.createElement('img')
        avatar.src = account.avatar_url;
        avatar.alt = `${avatar.login} avatar`

        // create div to arrange header and img
        const div = document.createElement('div');
        div.className = 'heading'
        div.append(avatar,header);

        // create <a> element to display link to profile
        const link = document.createElement('a');
        link.href = account.html_url
        link.target = "_blank";
        link.textContent = `Visit ${account.login}`;

        // Append to li item
        const li = document.createElement('li');
        li.append(div,link);

        // Appned li element to ul with id 'user-list'
        document.querySelector('#user-list').append(li);

        // Add event listener to img item
        header.addEventListener('click',(e)=>{
            document.querySelector('#repos-list').innerHTML = "";
            document.querySelector('#repos-list').style.border = "none";
            print(account.login);
            e.preventDefault();
            fetch(`https://api.github.com/users/`+account.login+`/repos`)
            .then(resp => resp.json())
            .then(printRepos)
        })


        // Function to display the repositories on the page
        function printRepos(repos){
            print(repos)
            const repoTitle = document.createElement('h2');
            repoTitle.textContent = `${account.login} Repositories`
            document.querySelector('#repos-list').append(repoTitle)
            document.querySelector('#repos-list').style.border = "dotted 5px red";

            for (let repo of repos){
                const repoItem = document.createElement('li')
                repoItem.textContent = repo.name
                document.querySelector('#repos-list').append(repoItem);
            }
        }   
    }
}