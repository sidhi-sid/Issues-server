/**
 * IssuesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const DataService = require("../services/dataService.js");
const ResponseService = require("../services/responseService");

module.exports = {
  async getIssues(req, res) {
    try {
      const issues = await DataService.fetchIssues();
      ResponseService.sendSuccessResponse(res, {
        data: {
          issues,
        },
      });
    } catch (err) {
      sails.log.error({
        method: "IssuesController:getIssues",
        err: err.message,
      });
      ResponseService.sendOopsError(res);
    }
  },

  async getIssue(req, res) {
    const { id } = req.params;
    try {
      const issue = await DataService.fetchIssue(id);
      ResponseService.sendSuccessResponse(res, {
        data: {
          issue: issue,
        },
      });
    } catch (err) {
      sails.log.error({
        method: "IssuesController:getIssue",
        err: err.message,
      });
      ResponseService.sendOopsError(res);
    }
  },

  async addIssue(req, res) {
    try {
      const { errMsg, issue: _issue } = await addIssue(req.body);
      if (!_.isEmpty(errMsg)) {
        ResponseService.sendErrResponse(res, {
          statusMessage: errMsg,
        });
      } else {
        ResponseService.sendSuccessResponse(res, {
          data: {
            issue: _issue,
          },
        });
      }
    } catch (err) {
      sails.log.error({
        method: "IssuesController:getIssue",
        err: err.message,
      });
      ResponseService.sendOopsError(res);
    }
  },

  async updateIssue(req, res) {
    const { id } = req.params;
    try {
      const { errMsg, issue: _issue } = await UpdateIssue(id, req.body);
      if (!_.isEmpty(errMsg)) {
        ResponseService.sendErrResponse(res, {
          statusMessage: errMsg,
        });
      } else {
        ResponseService.sendSuccessResponse(res, {
          data: {
            issue: _issue,
          },
        });
      }
    } catch (err) {
      sails.log.error({
        method: "IssuesController:updateIssue",
        err: err.message,
      });
      ResponseService.sendOopsError(res);
    }
  },

  async deleteIssue(req, res) {
    const { id } = req.params;
    try {
      const { errMsg } = await DeleteIssue(id);
      if (!_.isEmpty(errMsg)) {
        ResponseService.sendErrResponse(res, {
          statusMessage: errMsg,
        });
      } else {
        ResponseService.sendSuccessResponse(res);
      }
    } catch (err) {
      sails.log.error({
        method: "IssuesController:deleteIssue",
        err: err.message,
      });
      ResponseService.sendOopsError(res);
    }
  },
};

async function addIssue(data) {
  const { projectName, title, description, priority } = data;
  if (!projectName || !title || !priority) {
    return {
      errMsg: "Required params are missing",
    };
  }
  const issue = await Issue.create(data).fetch();

  return {
    issue: {
      ...issue.toJSON(),
    },
  };
}

async function UpdateIssue(issueId, data) {
  const { projectName, title, description, priority } = data;
  if (!projectName || !title || !priority) {
    return {
      errMsg: "Required params are missing",
    };
  }

  let Issue = await DataService.fetchIssue(issueId);
  if (_.isEmpty(Issue)) {
    return {
      errMsg: "Issue not found",
    };
  }

  const issue = await Issue.update(
    {
      _id: issueId,
    },
    data
  ).fetch();

  return {
    issue: {
      issue,
    },
  };
}

async function DeleteIssue(issueId) {
  let issue = await DataService.fetchIssue(issueId);
  if (_.isEmpty(issue)) {
    return {
      errMsg: "Issue not found",
    };
  }

  await Issue.destroy({
    _id: issueId,
  });
  return {};
}
