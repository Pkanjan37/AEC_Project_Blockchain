const Web3 = require('web3');
const moment = require('moment');
const { abi, data } = require('./contract');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const { eth } = web3;
const deployerAccount = eth.accounts[eth.accounts.length - 1];



// const { eth } = web3;
// const { accounts } = eth;
// exports.getAccounts = () => accounts;

exports.eth = eth;
exports.getAccounts = () => eth.accounts;
exports.getDeployerAccount = () => deployerAccount;

exports.deploy = () => new Promise((resolve, reject) => {
  console.log('deploying contract');
    eth.contract(abi).new(
        { from: deployerAccount, data, gas: '4700000' },
        (err, { address }) => {
            if (err) {
                reject(err);
            }
            if (address) {
              console.log('deployed @', address);
                resolve(address);
            }
        }
    )
  }
);

exports.logBalances = () => eth.accounts.forEach(
    account => console.log(eth.getBalance(account).toString())
);


exports.getMyBalance = account => eth.getBalance(account).toString();

exports.createProject = (address, creator, title, description, fundingGoal, projectDeadline) =>
    new Promise((resolve, reject) => {
        console.log("createProject");
        console.log("creator: ", creator);
        console.log("title: ", title);
        console.log("description: ", description);
        console.log("fundingGoal: ", fundingGoal);
        console.log("projectDeadline: ", projectDeadline);
		var unixtime = parseInt((new Date(projectDeadline).getTime() / 1000).toFixed(0));
        if (!projectDeadline) {
            console.error("no projectDeadline");
            return reject("no projectDeadline");
        }
            const event = web3.eth.contract(abi).at(address).ProjectAdded((err, res) => {
                if (err) {
                  console.error('ProjectAdded:', err);
                    return reject(err);
                }
                event.stopWatching();
                console.log('ProjectAdded: id:', res.args.id.toNumber());
                return resolve(res.args.id.toNumber());
            });
            web3.eth.contract(abi).at(address).create_project.sendTransaction(
                title,
                description,
                fundingGoal,
				unixtime,
                { from: creator, gas: 200000 },
                (err, txHash) => {
                    if (err) {
                      console.error('createProject:', err);
                        return reject(err);
                    }
                    console.log('createProject:', txHash);
                }
            );
        }
    );


exports.getFundingStatus = (address, projectId) => ({
        projectId,
        title: web3.eth.contract(abi).at(address).get_title(projectId),
        isFunded: web3.eth.contract(abi).at(address).is_project_funded(projectId),
        funding: web3.eth.contract(abi).at(address).show_funding(projectId).toNumber(),
        fundingGoal: web3.eth.contract(abi).at(address).show_funding_goal(projectId).toNumber(),
		deadline: moment(new Date(web3.eth.contract(abi).at(address).show_funding_deadline(projectId)*1000)).format("YYYY.MM.DD")
    }
);

exports.invest = (address, backer, projectId, value) => new Promise((resolve, reject) => {
  console.log('invest:');
  console.log('@:', address);
  console.log('backer:', backer);
  console.log('projectId:', projectId);
  console.log('value:', value);
    web3.eth.contract(abi).at(address).back.sendTransaction(
        projectId,
        { from: backer, value, gas: 200000 },
        (err, txHash) => {
            if (err) {
              console.error('invest:', err);
                return reject(err);
            }
            console.log('investsss:', txHash);
            return resolve();
        }
    )
  }
);

exports.refund = (address, creator, projectId) => new Promise((resolve, reject) => {
    console.log('refund a project ');
    console.log('creator:', creator);
    console.log('projectId:', projectId);

    web3.eth.contract(abi).at(address).refund_all.sendTransaction(
        projectId,
        { from: creator, gas: 200000 },
        (err, txHash) => {
            if (err) {
                reject(err);
            }
            console.log('refund:', txHash);
           return resolve();
        }
    );
});

exports.withdraw = (address, creator, projectId) => new Promise((resolve, reject) => {
  console.log('withdraw ');
  console.log('creator:', creator);
  console.log('projectId:', projectId);
  web3.eth.contract(abi).at(address).withdraw_funds.sendTransaction(
    projectId,
    { from: creator, gas: 200000 },
    (err, txHash) => {
      if (err) {
        console.log('withdraw funding not reached or error');
        return reject(err);
      }
      console.log('withdraw:', txHash);
      return resolve();
    }
  );
});

exports.getShare = (address, backer, projectId) => {
  console.log('getShare ');
  console.log('backer:', backer);
  console.log('projectId:', projectId);
  return web3.eth.contract(abi).at(address).get_share_in_percentage(
    projectId,
    { from: backer }
  ).toNumber();
}
exports.listAllProject = (address) => {
    const activeProjects = web3.eth.contract(abi).at(address).get_active_projects().map(id => id.toNumber());
    console.log("activeProjects: ", activeProjects);
    var output = activeProjects.map(id => {
        const project = web3.eth.contract(abi).at(address).get_project(id);
        project.project_id = id;
        return project;
    });
    console.log("output: ", output);
	var result = [];
	for (var j=0;j<output.length;j++){
		var temp;
	if(output[j][5] < Date.now() / 1000 | 0 && Number(JSON.stringify(output[j][0]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1')) > 
	 Number(JSON.stringify(output[j][1]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1'))){
		 web3.eth.contract(abi).at(address).refund_all.sendTransaction(
        j,
        { from: output[j][4], gas: 200000 },
        (err, txHash) => {
            if (err) {
                reject(err);
            }
            console.log('cancel projectId = '+ j + ' due to deadline already end :', txHash);
        }
    );
	}else {
		temp = {
            project_id: output[j].project_id,
            title : output[j][2],
			description : output[j][3],
			funding_goal : JSON.stringify(output[j][0]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1'),
			current_funding: JSON.stringify(output[j][1]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1'),
			creator_address : output[j][4],
			deadline : moment(new Date(JSON.stringify(output[j][5]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1')*1000)).format("YYYY.MM.DD")
		}
	result.push(temp);
	}
	}
  console.log(output);
  console.log(result)
	return result;
};

exports.creatorViewProject = (address, account) => {
  console.log("creatorViewProject");
  console.log("account:", account);
  console.log("adress:", address);

    const createdProjectIds = web3.eth.contract(abi).at(address).get_projects_created({ from: account, gas: 200000 }).map(id => id.toNumber());
	const output = createdProjectIds.map(id => {
        const project = web3.eth.contract(abi).at(address).get_project(id);
        project.project_id = id;
        return project;
    });
    console.log("creator project ids", output.map(project => project.project_id));
	var result = [];
	for (var j=0;j<output.length;j++){
		var temp;
	if(output[j][5] < Date.now() / 1000 | 0 && Number(JSON.stringify(output[j][0]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1')) > 
	 Number(JSON.stringify(output[j][1]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1'))){
		 web3.eth.contract(abi).at(address).refund_all.sendTransaction(
        j,
        { from: output[j][4], gas: 200000 },
        (err, txHash) => {
            if (err) {
                reject(err);
            }
            console.log('cancel projectId = '+ j + ' due to deadline already end :', txHash);
        }
    );
	}else {
		temp = {
            project_id: output[j].project_id,
            title : output[j][2],
			description : output[j][3],
			funding_goal : JSON.stringify(output[j][0]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1'),
			current_funding: JSON.stringify(output[j][1]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1'),
			creator_address : output[j][4],
			deadline : moment(new Date(JSON.stringify(output[j][5]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1')*1000)).format("YYYY.MM.DD")
		}
	result.push(temp);
	}
	}

    console.log("active creator project ids:", result.map(project => project.project_id));
    return result;
};

exports.viewInvestedProject = (address, account) => {
  console.log("viewInvestedProject");
  console.log("account:", account);
  console.log("address:", address);

    var investedProjectIds = web3.eth.contract(abi).at(address).get_invested_projects({ from:account, gas: 200000 }).map(id => id.toNumber());
    const output = investedProjectIds.map(id => {
        const project = web3.eth.contract(abi).at(address).get_project(id);
        project.project_id = id;
        return project;
    });
  console.log("projects", output);
	var result = [];
	for (var j=0;j<output.length;j++){
		var temp;
	if(output[j][5] < Date.now() / 1000 | 0 && Number(JSON.stringify(output[j][0]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1')) > 
	 Number(JSON.stringify(output[j][1]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1'))){
		 web3.eth.contract(abi).at(address).refund_all.sendTransaction(
        j,
        { from: output[j][4], gas: 200000 },
        (err, txHash) => {
            if (err) {
                reject(err);
            }
            console.log('cancel projectId = '+ j + ' due to deadline already end :', txHash);
        }
    );
	}else {
		temp = {
            project_id: output[j].project_id,
            title : output[j][2],
			description : output[j][3],
			funding_goal : JSON.stringify(output[j][0]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1'),
			current_funding: JSON.stringify(output[j][1]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1'),
			creator_address : output[j][4],
			deadline : moment(new Date(JSON.stringify(output[j][5]).replace( /(^.*\[|\].*$)/g ).replace(/^"(.*)"$/, '$1')*1000)).format("YYYY.MM.DD")
		}
	result.push(temp);
	}
	}
  console.log(output);
  console.log(result)
  return result;
};

exports.getCreatorAddress = (address,projectId) => {
  console.log('projectId:', projectId);
  return web3.eth.contract(abi).at(address).show_project_creator(projectId);
}
