class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){        
        let count = 0;
        let message = '';
        let path_file = '';
        for (let index = 0; index < this.staging.length; index++) {
            if (!this.staging[index]['location']) {
                path_file = this.staging[index]['name'];
            }
            else {
                path_file = this.staging[index]['location'] + '/' + this.staging[index]['name'];
            }
            if (message.length == 0) {
                message += path_file;
            }
            else {
                message += '\n' + path_file;
            }
            count++;
        }
        return `You have ${count} change/s.\n${message}`;
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;
