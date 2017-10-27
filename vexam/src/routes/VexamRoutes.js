import React, { Component } from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import { Redirect } from 'react-router';


import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import AdminLayout from '../layouts/AdminLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import ExamLayout from '../layouts/ExamLayout';

import LoginWrapper from '../components/auth/LoginWrapper.container';


import AddDepartment from '../components/departments/add-department.component';
import DepartmentIndex from '../components/departments/department-index.component';

import QuestionsIndex from '../components/questions/question-index.component';
import AddQuestion from '../components/questions/add-question.component';

import ExamSet from '../components/examsets/examset-index.component';
import AddExamSet from '../components/examsets/add-examset.component';
import ExamQuestions from '../components/examsets/exam-questionset.component';

import TestTable from '../components/questions/testtable.component';

import QuestionCategoryIndex from '../components/questionCategories/questionCategories-index.component';
import AddQuestionCategory from '../components/questionCategories/add-questionCategory.component';

import QuestionComplexityIndex from '../components/questionComplexities/questionComplexity-index.component';
import AddQuestionComplexity from '../components/questionComplexities/add-questionComplexity.component';

import JobIndex from '../components/jobs/job-index.component';
import AddJob from '../components/jobs/add-jobs.component';
import SetQuestions from '../components/examsets/setquestionsbyexamset';
import InterviewSessions from '../components/interviewSession/interviewSession-index.component';
import InterviewSessionIndex from '../components/interviewSession/interviewSessionHistory.component';
import AllInterviewSessions from '../components/checkAnswer/interviewSessions.component';
import ExamAttendedInterviewee from '../components/checkAnswer/examAttentedInterviewes.component';
import AddSessionJobs from '../components/interviewSession/sessionJobs.component';
import SessionJobs from '../components/interviewSession/InterviewSesssionHistory-JobList.component';
import Interviewees from '../components/interviewSession/InterviewSesssionHistory-IntervieweeList.component';
import AddInterviewees from '../components/interviewSession/interviewees.component';

import AddInterviewSession from '../components/interviewSession/add-interviewSession.component';
import Logout from '../components/auth/Logout.component'
import AnswerSheetContainer from '../components/checkAnswer/answersheet.component';
import AllQuestions from '../components/checkAnswer/allQuestions.component';

import AdminLogin from '../components/auth/AdminLogin.component';
import UserLogin from '../components/auth/UserLogin.component';


import ExamWrapper from '../components/examsample/ExamWrapper.container';




const Home = (props) => {
    return (
        <Panel header={props.heading}>
            <h1>Home</h1>
        </Panel>
    );
}

const Missed = (props) => {
    return (
        <h1>404</h1>
    );
}

const Projects = (props) => {
    return (
        <Panel header={props.heading}>
            <h1>Project Management</h1>
        </Panel>
    );
}

const ProjectItem = (props) => {
    return (
        <Panel header={props.heading}>
            <h1>Item</h1>
            <NavLink exact to="/admin/departments/add">Add department</NavLink>
        </Panel>
    );
}




const VexamRoutes = (props) => (
    <div>
        <Switch>
            <DefaultLayout exact path="/" component={UserLogin} heading="User Login" authed={props.authed} />
            <DefaultLayout exact path="/admin/login" component={AdminLogin} heading="Admin Login" authed={props.authed} />
            <ExamLayout exact path='/exam' component={ExamWrapper} />
            <AdminLayout exact path="/admin" component={Home} heading="Dashboard" authed={props.authed} />
            <AdminLayout exact path="/admin/departments" component={DepartmentIndex} authed={props.authed} heading="Departments" />
            <AdminLayout exact path="/admin/departments/add" component={AddDepartment} authed={props.authed} heading="Add Department" />
            <AdminLayout exact path="/admin/department/:id" component={AddDepartment} {...props} authed={props.authed} heading="Edit Department" />
            <AdminLayout exact path="/admin/categories" component={QuestionCategoryIndex} heading="Question Category" authed={props.authed} />
            <AdminLayout exact path="/admin/categories/add" component={AddQuestionCategory} {...props} heading="Add Question Category" authed={props.authed} />
            <AdminLayout exact path="/admin/categories/:id" component={AddQuestionCategory} {...props} heading="Edit Question Category" authed={props.authed} />
            <AdminLayout exact path="/admin/complexities" component={QuestionComplexityIndex} heading="Question Complexity" authed={props.authed} />
            <AdminLayout exact path="/admin/complexity/add" component={AddQuestionComplexity} {...props} heading="Add Question Complexity" authed={props.authed} />
            <AdminLayout exact path="/admin/complexity/:id" component={AddQuestionComplexity} {...props} heading="Edit Question Complexity" authed={props.authed} />
            <AdminLayout exact path="/admin/jobs" component={JobIndex} heading="Jobs" authed={props.authed} />
            <AdminLayout exact path="/admin/job/add" component={AddJob} {...props} heading="Add Job" authed={props.authed} />
            <AdminLayout exact path="/admin/job/:id" component={AddJob} {...props} heading="Edit Job" authed={props.authed} />
            <AdminLayout exact path="/admin/questions" component={QuestionsIndex} heading="Questions" authed={props.authed} />
            <AdminLayout exact path="/admin/questions/add" component={AddQuestion} {...props} heading="Add Question" authed={props.authed} />
            <AdminLayout exact path="/admin/question/:id" component={AddQuestion} {...props} heading="Edit Question" authed={props.authed} />
            <AdminLayout exact path="/admin/examsets" component={ExamSet} heading="Examsets" authed={props.authed} />
            <AdminLayout exact path="/admin/examsets/add" component={AddExamSet} {...props} heading="Add Examset" authed={props.authed} />
            <AdminLayout exact path="/admin/examsets/:id" component={AddExamSet} {...props} heading="Edit Examset" authed={props.authed} />
            <AdminLayout exact path="/admin/setquestions/:id" component={SetQuestions} {...props} heading="Set Questions" authed={props.authed} />
            <AdminLayout exact path="/admin/examsets/:id/questions" component={ExamQuestions} {...props} heading="Examset Questions" authed={props.authed} />
            <AdminLayout exact path="/admin/settings" component={Projects} />
            <AdminLayout exact path="/admin/users" component={Projects} />
            <AdminLayout exact path="/admin/interviewsessions" component={InterviewSessions} heading="Interview Sessions" authed={props.authed} />
            <AdminLayout exact path="/admin/interviewsession/history" component={InterviewSessionIndex} heading="Interview Sessions History" authed={props.authed} />
            <AdminLayout exact path="/admin/interviewSession/add" component={AddInterviewSession} {...props} heading="Add Interview Session" authed={props.authed} />
            <AdminLayout exact path="/admin/interviewSession/:id" component={AddInterviewSession} {...props} heading="Edit Interview Session" authed={props.authed} />
            <AdminLayout exact path="/admin/interviewSession/:id/jobs" component={AddSessionJobs} {...props} authed={props.authed} />
            <AdminLayout exact path="/admin/interviewSessionHistory/:id/jobs" component={SessionJobs} {...props} authed={props.authed} />
            <AdminLayout exact path="/admin/interviewSession/:id/interviewees" component={AddInterviewees} {...props} authed={props.authed} />
            <AdminLayout exact path="/admin/interviewSessionHistory/:id/interviewees" component={Interviewees} {...props} authed={props.authed} />
            <AdminLayout exact path="/admin/checkanswers" component={AllInterviewSessions} />
            <AdminLayout exact path="/admin/interviewSessions/:id/attended/interviewees" component={ExamAttendedInterviewee} {...props} authed={props.authed} />
            <AdminLayout exact path="/admin/interviewSessions/interviewees/:id/answersheet" component={AnswerSheetContainer} {...props} authed={props.authed} />
            <AdminLayout exact path="/admin/interviewSessions/interviewees/:id/all/answersheet" component={AllQuestions} {...props} authed={props.authed} />
            <DefaultLayout exact path="/admin/logout" component={Logout} />

            <Route exact path="/admin/test"
                render={props => (
                    <Home heading="TEst Page" />
                )}
            />
            <Route exact path="/admin/exam"
                render={props => (
                    <ProjectItem heading="Project" />
                )}
            />
            <Route path="*" component={Missed} />

        </Switch>
    </div>
)


export default VexamRoutes;