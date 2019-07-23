pragma solidity ^0.4.0;
contract Blockstarter{
    struct Project{
        bool isActive;
        uint funding_goal;
        uint current_funding;
        uint end_date;
        string title;
        string description;
        address creator;
        address[] backer_keys;
        mapping (address => uint) backers;
    }

    Project[] projects;

    event ProjectAdded(uint id);

    modifier isProjectOwner(uint project_id) {
        require(projects[project_id].creator == msg.sender);
        _;
    }

    modifier isFundingSuccess(uint project_id) {
        require(projects[project_id].current_funding >= projects[project_id].funding_goal);
        _;
    }


    function create_project(string _title, string _description, uint _funding_goal, uint _end_date){
        projects.push(Project({
            isActive: true,
            funding_goal : _funding_goal,
            end_date: _end_date,
            creator : msg.sender,
            current_funding : 0,
            title : _title,
            description : _description,
            backer_keys : new address[](0)
        }));

        ProjectAdded(projects.length-1);
    }

    function back(uint project_id) payable{
        if(projects[project_id].backers[msg.sender] == 0 && msg.value > 0){
            projects[project_id].backer_keys.push(msg.sender);
        }
        projects[project_id].backers[msg.sender] +=msg.value;
        projects[project_id].current_funding += msg.value;
    }


    function show_funding(uint project_id) constant returns (uint){
        return projects[project_id].current_funding;
    }

    function get_title(uint project_id) constant returns (string){
        return projects[project_id].title;
    }

    function show_funding_goal(uint project_id) constant returns (uint){
        return projects[project_id].funding_goal;
    }

    function is_project_funded(uint project_id) constant returns (bool){
        return projects[project_id].current_funding >= projects[project_id].funding_goal;
    }

    function update_funding_goal(uint project_id, uint goal){
        require(projects[project_id].creator == msg.sender);
        projects[project_id].funding_goal = goal;
    }

    function update_title(uint project_id, string title){
        require(projects[project_id].creator == msg.sender);
        projects[project_id].title = title;
    }

    function update_description(uint project_id,string description){
        require(projects[project_id].creator == msg.sender);
        projects[project_id].description = description;
    }

    function refund_all(uint project_id) isProjectOwner(project_id) {
        Project project = projects[project_id];
        for(uint i = 0; i < project.backer_keys.length; i++){
            address receiver = project.backer_keys[i];
            var amount = project.backers[receiver];
            project.backers[receiver] = 0;
            receiver.transfer(amount);
        }
        project.isActive = false;
        project.current_funding = 0;
    }

    function withdraw_funds(uint project_id) isProjectOwner(project_id) isFundingSuccess(project_id) {
        Project project = projects[project_id];
        project.creator.transfer(project.current_funding);
        project.current_funding = 0;
        project.isActive = false;
    }

    function get_active_projects() constant returns (uint[]){
        uint numActive = 0;
        for(uint i = 0; i < projects.length; i++){
            if (projects[i].isActive == true) {
               numActive++;
            }
        }
        uint[] memory activeProjects = new uint[](numActive);
        uint idx = 0;
        for(uint j = 0; j < projects.length; j++){
            if (projects[j].isActive == true) {
               activeProjects[idx++] = j;
            }
        }
        return activeProjects;
    }

    function get_amount_backers(uint project_id) constant returns (uint){
        return projects[project_id].backer_keys.length;
    }

    function get_invested_projects() constant returns (uint[]) {
        uint numInvestedProjects = 0;
        bool[] memory hasInvestedInProject = new bool[](projects.length);
        for(uint i = 0; i <  projects.length; i++){
            Project project = projects[i];
            hasInvestedInProject[i] = false;
            for(uint b = 0; b < project.backer_keys.length; b++){
                if (project.backer_keys[b] == msg.sender && project.isActive == true) {
                    hasInvestedInProject[i] = true;
                    numInvestedProjects++;
                }
            }
        }
        uint[] memory investedProjects = new uint[](numInvestedProjects);
        uint idx = 0;
        for(uint j = 0; j < projects.length; j++){
           if (hasInvestedInProject[j]) {
               investedProjects[idx++] = j;
           }
        }
        return investedProjects;
    }

    function get_share_in_percentage(uint project_id) constant returns (uint){
        Project project = projects[project_id];
        uint currentFunding = project.current_funding;
        if (currentFunding == 0) return 0;
        return ((100*project.backers[msg.sender])/currentFunding);
    }

    function get_projects_created() constant returns (uint[]){
        bool[] memory hasCreatedProject = new bool[](projects.length);
        uint numberOfCreatedProjects = 0;
        for(uint i = 0; i < projects.length; i++){
            hasCreatedProject[i] = false;
            if(projects[i].creator == msg.sender && projects[i].isActive == true){
                hasCreatedProject[i] = true;
                numberOfCreatedProjects++;
            }
        }
        uint[] memory output = new uint[](numberOfCreatedProjects);
        uint idx = 0;
        for(uint j = 0; j < projects.length; j++){
            if(hasCreatedProject[j]){
                output[idx++] = j;
            }
        }
        return output;
    }
    
    function get_project(uint i) constant returns(uint, uint, string, string, address, uint){
        return (projects[i].funding_goal, projects[i].current_funding, projects[i].title, projects[i].description, projects[i].creator, projects[i].end_date);
    }
}
