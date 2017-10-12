import React, { Component } from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import { Redirect } from 'react-router'


import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';


import AddDepartment from '../../components/departments/add-department.component';
import DepartmentIndex from '../../components/departments/department-index.component';

import QuestionsIndex from '../../components/questions/question-index.component';
import AddQuestion from '../../components/questions/add-question.component';

import ExamSet from '../../components/examsets/examset-index.component';
import AddExamSet from '../../components/examsets/add-examset.component';
import ExamQuestions from '../../components/examsets/exam-questionset.component';

import TestTable from '../../components/questions/testtable.component';

import QuestionCategoryIndex from '../../components/questionCategories/questionCategories-index.component';
import AddQuestionCategory from '../../components/questionCategories/add-questionCategory.component';

import QuestionComplexityIndex from '../../components/questionComplexities/questionComplexity-index.component';
import AddQuestionComplexity from '../../components/questionComplexities/add-questionComplexity.component';

import JobIndex from '../../components/jobs/job-index.component';
import AddJob from '../../components/jobs/add-jobs.component';
import SetQuestions from '../../components/examsets/setquestionsbyexamset';
import InterviewSessions from '../../components/interviewSession/interviewSession-index.component';
import InterviewSessionIndex from '../../components/interviewSession/interviewSessionHistory.component';
import AddSessionJobs from '../../components/interviewSession/sessionJobs.component';
import SessionJobs from '../../components/interviewSession/InterviewSesssionHistory-JobList.component';
import Interviewees from '../../components/interviewSession/InterviewSesssionHistory-IntervieweeList.component';
import AddInterviewees from '../../components/interviewSession/interviewees.component';

import AddInterviewSession from '../../components/interviewSession/add-interviewSession.component';



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

const VExamRoutes = () => (

    <div>
        <Switch>

            <Route exact path="/" render={() => <Home heading="Dashboard" />} />
            <Route exact path="/admin/departments"
                render={props => (
                    <DepartmentIndex heading="Manage Departments" />
                )}
            />
            <Route exact path="/admin/departments/add"
                render={props => (
                    <AddDepartment heading="Add New Department" {...props} />
                )}
            />
            <Route exact path="/admin/department/:id"
                render={props => (
                    <AddDepartment heading="Edit Department"  {...props} />
                )}
            />
            <Route exact path="/admin/categories"
                render={props => (
                    <QuestionCategoryIndex heading="Question Categories" />
                )}
            />
            <Route exact path="/admin/categories/add"
                render={props => (
                    <AddQuestionCategory heading="Add Question Category" {...props} />
                )}
            />
            <Route exact path="/admin/categories/:id"
                render={props => (
                    <AddQuestionCategory heading="Edit Question Category"  {...props} />
                )}
            />
            {/*Question Complexity*/}
            <Route exact path="/admin/complexities"
                render={props => (
                    <QuestionComplexityIndex heading="Question Complexities" />
                )}
            />
            <Route exact path="/admin/complexity/add"
                render={props => (
                    <AddQuestionComplexity heading="Add Question Complexity" {...props} />
                )}
            />
            <Route exact path="/admin/complexity/:id"
                render={props => (
                    <AddQuestionComplexity heading="Edit Question Complexity"  {...props} />
                )}
            />
            {/*Jobs*/}
            <Route exact path="/admin/jobs"
                render={props => (
                    <JobIndex heading="Jobs" />
                )}
            />
            <Route exact path="/admin/job/add"
                render={props => (
                    <AddJob heading="Add Job" {...props} />
                )}
            />
            <Route exact path="/admin/job/:id"
                render={props => (
                    <AddJob heading="Edit job"  {...props} />
                )}
            />
            {/*Exam*/}
            <Route exact path="/admin/exam"
                render={props => (
                    <ProjectItem heading="Project" />
                )}
            />
            <Route exact path="/admin/questions"
                render={props => (
                    <QuestionsIndex heading="Add Questions" />
                )}
            />
            <Route exact path="/admin/questions/add"
                render={props => (
                    <AddQuestion heading="Add Questions" {...props} />
                )}
            />
            <Route exact path="/admin/question/:id"
                render={props => (
                    <AddQuestion heading="Edit Question"  {...props} />
                )}
            />
            <Route exact path="/admin/examsets"
                render={props => (
                    <ExamSet heading="Manage Exam Sets" />
                )}
            />
            <Route exact path="/admin/examsets/add"
                render={props => (
                    <AddExamSet heading="Add Exam Set" {...props} />
                )}
            />
            <Route exact path="/admin/examsets/:id"
                render={props => (
                    <AddExamSet heading="Edit Exam Set"  {...props} />
                )}
            />
            <Route exact path="/admin/setquestions/:id"
                render={props => (
                    <SetQuestions heading="Set Questions"  {...props} />
                )}
            />
            <Route exact path="/admin/examsets/:id/questions"
                render={props => (
                    <ExamQuestions heading="Add Set Questions" {...props} />
                )}
            />
            <Route exact path="/admin/settings"
                render={props => (
                    <Projects heading="Project" />
                )}
            />
            <Route exact path="/admin/users"
                render={props => (
                    <Projects heading="Project Items Page" />
                )}
            />
            <Route exact path="/admin/interviewsessions"
                render={props => (
                    <InterviewSessions heading="Interview Sessions" />
                )}
            />
            <Route exact path="/admin/interviewsession/history"
                render={props => (
                    <InterviewSessionIndex heading="Interview Session History" />
                )}
            />
            <Route exact path="/admin/interviewSession/add"
                render={props => (
                    <AddInterviewSession heading="Add Interview Sessions" {...props} />
                )}
            />
            <Route exact path="/admin/interviewSession/:id"
                render={props => (
                    <AddInterviewSession heading="Edit Interview Sessions"  {...props} />
                )}
            />
            <Route exact path="/admin/interviewSession/:id/jobs"
                render={props => (
                    <AddSessionJobs heading="Job Vacancies for this session"  {...props} />
                )}
            />
            <Route exact path="/admin/interviewSessionHistory/:id/jobs"
                render={props => (
                    <SessionJobs heading="Job Vacancies for this session"  {...props} />
                )}
            />
            <Route exact path="/admin/interviewSession/:id/interviewees"
                render={props => (
                    <AddInterviewees heading="Interviewees for this session"  {...props} />
                )}
            />
            <Route exact path="/admin/interviewSessionHistory/:id/interviewees"
                render={props => (
                    <Interviewees heading="Interviewees for this session"  {...props} />
                )}
            />

            <Route exact path="/admin/login"
                render={props => (
                    <Redirect to='/' />
                )}
            />


            <Route exact path="/admin/test"
                render={props => (
                    <Home heading="TEst Page" />
                )}
            />



            <Route path="*" component={Missed} />

        </Switch>

    </div>

)


export default VExamRoutes;