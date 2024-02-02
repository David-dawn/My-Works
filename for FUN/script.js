let activeFlag, typeOfCard, allTeamMembers, allJobPosts, transformProperty, theOpacity = "0.1";

let createCategory = (name, params) => {
    if (!activeFlag) {
        activeFlag = true;

        for (let i = 0; i < params.allTeamMembers.length; i++) {
            // selected will highlight
            for (let i = 0; i < params.allJobPosts.length; i++) {
                if (params.allJobPosts[i] != params.that) {
                    params.allJobPosts[i].style.opacity = theOpacity;
                } else {
                    params.allJobPosts[i].style.opacity = "1";
                }
            }
            // all selected will highlight
            if (params.allTeamMembers[i].classList.contains(name)) {
                // params.allTeamMembers[i].style.transform = "scale(1.1)";
                params.allTeamMembers[i].style.opacity = "1";
            } else {
                // all non selected will be less visible
                if (params.allTeamMembers[i] !== params.that) {
                    params.allTeamMembers[i].style.opacity = theOpacity;

                    // if any other bubble is selected, it will be back to it's original size
                    // params.allTeamMembers[i].style.transform = "scale(1)";
                }
            }
        }

        // params.that.style.transform = "scale(1.1)";
    } else {
        activeFlag = false;

        for (let i = 0; i < params.allTeamMembers.length; i++) {
            params.allTeamMembers[i].style.opacity = "1";
            // params.allTeamMembers[i].style.transform = "scale(1)";
            params.allTeamMembers[i].style.backgroundColor = "pink";
        }
        for (let i = 0; i < params.allJobPosts.length; i++) {
            params.allJobPosts[i].style.opacity = "1";
        }

        // params.that.style.transform = "scale(1)";
    }
}

onclickJobPost = (that) => {
    typeOfCard = that.childNodes[1].innerHTML;

    allTeamMembers = document.querySelectorAll(".teamMember");
    allJobPosts = document.querySelectorAll(".jobPost");

    let params = { that, allTeamMembers, allJobPosts };

    switch (typeOfCard) {
        case "Web Developer":
            createCategory("dev", params)
            break;
        case "Communication Designers":
            createCategory("des", params);
            break;
        case "Projector Manager":
            createCategory("animator", params);
            break;
        case "Fronted Developer":
            createCategory("illus", params);
            break;
        case "Team Leader":
            createCategory("founder", params);
            break;
        case "Lens Man":
            createCategory("ca", params);
            break;
        case "Software Developer":
            createCategory("se", params);
            break;
    }
}