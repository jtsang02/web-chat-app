import { createDOM, emptyDOM } from '../views/utils.js';

class ProfileView {
    constructor() {
        this.elem = createDOM(
            `<div class = "content">
                <div class="profile-form">
                    <div class = "form-field">
                        <label for="user-setting">Username</label>
                        <input type="text" id="user-name">
                    </div>
                    <div class = "form-field">
                        <label for="user-setting">Password</label>
                        <input type="text" id="user-password">
                    </div>
                    <div class = "form-field">
                        <label for="user-setting">Avatar Image</label>
                        <span>
                            <img src="assets/profile-icon.png" alt="">
                            <input type="file" id="user-image">
                        </span>
                        </input>
                    </div>
                    <div class = "form-field">
                        <label for="user-setting">About</label>
                        <textarea name="" id="" cols="10" rows="10"></textarea>
                    </div>
                </div>
                <div class="page-control">
                    <button>Save</button>
                </div>
            </div>`
        );
    }
    
}

// function createDOM (htmlString) {
//     let template = document.createElement('template');
//     template.innerHTML = htmlString.trim();
//     return template.content.firstChild;
// }

export default ProfileView;