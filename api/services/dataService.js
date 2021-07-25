module.exports = {
  fetchIssues() {
    // TODO
    const query = {
      sort: "priority ASC",
    };
    return Issue.find(query).populateAll();
  },

  fetchIssue(issueId) {
    return Issue.findOne({
      _id: issueId,
    });
  },
};
