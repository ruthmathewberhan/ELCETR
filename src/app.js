App = {
  loading: false,
  contracts: {},
  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    //Load app...
    console.log("app loading");
  },
  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      window.alert("Please connect to Metamask.");
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        });
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },
  loadAccount: async () => {
    web3.eth.defaultAccount = ethereum._state.accounts[0];
    App.account = web3.eth.accounts[0];
    console.log(App.account);
  },

  loadContract: async () => {
    const education = await $.getJSON("Education.json");
    App.contracts.Education = TruffleContract(education);
    App.contracts.Education.setProvider(App.web3Provider);
    // Hydrate the smart contract with values from the blockchain
    App.education = await App.contracts.Education.deployed();
    console.log(App.education);
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return;
    }

    //update app loading state
    App.setLoading(true);

    //Render Account
    $("#account").html(App.account);
    // Render Tasks
    await App.renderEduInformations();

    // Update loading state
    App.setLoading(false);
  },

  renderEduInformations: async () => {
    //Load the total task count from the blockchain
    const eduCount = await App.education.eduCount();
    const $taskTemplate = $(".taskTemplate");

    const items = Array(eduCount - 1 + 1).fill().map((_, idx) => 1 + idx);
    const iter = new Iterator(items);

    //console.log(iter.hasNext());

    while (iter.hasNext()) {
      //console.log(iter.next());
      const edu = await App.education.eduInformations(iter.next());
      console.log(edu);
      const eduId = edu[0].toNumber();
      const eduName = edu[1];
      const eduContent = edu[2];
      const eduCompleted = edu[3];

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone();
      $newTaskTemplate.find(".stuName").html(eduName);
      $newTaskTemplate.find(".content").html(eduContent);
      $newTaskTemplate
        .find("input")
        .prop("name", eduId)
        .prop("checked", eduCompleted)
        .on("click", App.toggleCompleted);
      // Put the task in the correct list
      if (eduCompleted) {
        $("#completedTaskList").append($newTaskTemplate);
      } else {
        $("#taskList").append($newTaskTemplate);
      }
      //Show the task
      $newTaskTemplate.show();
    }

    //console.log(iter.hasNext());
    //Render out each task with a new task templete
    // for (var index = 1; index <= eduCount; index++) {
    //   //fetch the task data from the blockchain
    //   const edu = await App.education.eduInformations(index);
    //   const eduId = edu[0].toNumber();
    //   const eduName = edu[1];
    //   const eduContent = edu[2];
    //   const eduCompleted = edu[3];

    //   // Create the html for the task
    //   const $newTaskTemplate = $taskTemplate.clone();
    //   $newTaskTemplate.find(".stuName").html(eduName);
    //   $newTaskTemplate.find(".content").html(eduContent);
    //   $newTaskTemplate
    //     .find("input")
    //     .prop("name", eduId)
    //     .prop("checked", eduCompleted)
    //     .on("click", App.toggleCompleted);
    //   // Put the task in the correct list
    //   if (eduCompleted) {
    //     $("#completedTaskList").append($newTaskTemplate);
    //   } else {
    //     $("#taskList").append($newTaskTemplate);
    //   }
    //   //Show the task
    //   $newTaskTemplate.show();
    // }
  },

  createEduInfo: async () => {
    App.setLoading(true);
    const stuName = $("#newName").val();
    const content = $("#newTask").val();
    await App.education.createEduInfo(stuName, content);
    window.location.reload();
  },

  toggleCompleted: async (e) => {
    App.setLoading(true);
    const eduId = e.target.name;
    await App.education.toggleCompleted(eduId);
    window.location.reload();
  },

  setLoading: (boolean) => {
    App.loading = boolean;
    const loader = $("#loader");
    const content = $("#content");
    const stuName = $("#stuName");
    if (boolean) {
      loader.show();
      content.hide();
      stuName.hide();
    } else {
      loader.hide();
      content.show();
      stuName.show();
    }
  },
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
