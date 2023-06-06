import { useState, useEffect, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
    Signin,
    ForgotPassword,
    ResetPassword,
    Dashboard,
    Department,
    User,
    DocumentType,
    DocumentIn,
    DocumentOut,
    DocumentDetail,
    Page404,
    Profile,
    CreateDepartment,
    CreateDocumentType,
    DefaultLayout,
    CreateUser,
    CreateDocument,
    Tasks,
    CreateTask,
    АдминистраторTaskDetail,
    MemberTaskDetail,
    AdminTaskDetail,
} from './pages';
import ProtectedRoutes from './pages/Others/ProtectedRoutes';
import PublicRoutes from './pages/Others/PublicRoutes';
import * as authServices from '~/services/authServices';
import BlockPage from './pages/Others/BlockPage';
import SignUp from './pages/Authentications/SignUp';
import Archives from './pages/Archives/Archives';
import EditArchive from './pages/Archives/EditArchive';

export const AvatarContext = createContext();

const App = () => {
    const [activeFlag, setActiveFlag] = useState(JSON.parse(localStorage.getItem('activeFlag')) || true);
    const [userRole, setUserRole] = useState(/*JSON.parse(localStorage.getItem('userRole')) ||*/ 'Администратор');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isChangeAvatar, setIsChangeAvatar] = useState(false);

    /*useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;
        const decodedToken = jwt_decode(accessToken);
        setUserRole(decodedToken.role);
    }, [isSuccess]);

    useEffect(() => {
        localStorage.setItem('userRole', JSON.stringify(userRole));
    }, [userRole, isSuccess]);

    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return;
        const decodedToken = jwt_decode(refreshToken);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            return localStorage.clear();
        }
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;
        const fetchApi = async () => {
            const res = await authServices.getCurrUser();
            setActiveFlag(res.isActived);
        };
        fetchApi();
    }, [isSuccess]);

    useEffect(() => {
        localStorage.setItem('activeFlag', JSON.stringify(activeFlag));
    }, [activeFlag, isSuccess]);*/

    return (
        <AvatarContext.Provider value={{ isChangeAvatar, setIsChangeAvatar }}>
            <Router>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path="/signin" element={<Signin setIsSuccess={() => setIsSuccess(!isSuccess)} />} />
                        <Route path="/signup" element={<SignUp setIsSuccess={() => setIsSuccess(!isSuccess)} />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                    </Route>
                    <Route element={<ProtectedRoutes />}>
                        {activeFlag === true ? (
                            <>
                                <Route
                                    path="/dashboard"
                                    element={
                                        <DefaultLayout>
                                            <Dashboard />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/archives"
                                    element={
                                        <DefaultLayout>
                                            <Archives />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/archives/edit/:id"
                                    element={
                                        userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <EditArchive />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route
                                    path="/departments"
                                    element={
                                        userRole === 'Модератор' || userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <Department />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route
                                    path="/departments/edit/:id"
                                    element={
                                        userRole === 'Модератор' || userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <CreateDepartment title={'Редактировать отделы'} />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route
                                    path="/departments/create"
                                    element={
                                        userRole === 'Модератор' || userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <CreateDepartment title={'Добавить новые отделы'} />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route
                                    path="/users"
                                    element={
                                        userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <User />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route
                                    path="/users/edit/:id"
                                    element={
                                        userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <CreateUser title="Редактировать участника" />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route
                                    path="/users/create"
                                    element={
                                        userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <CreateUser title="Добавить новых участников" />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route
                                    path="/document-types"
                                    element={
                                        userRole === 'Модератор' || userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <DocumentType />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route
                                    path="/document-types/edit/:id"
                                    element={
                                        userRole === 'Модератор' || userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <CreateDocumentType title="Редактировать тип документа" />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route
                                    path="/document-types/create"
                                    element={
                                        userRole === 'Модератор' || userRole === 'Администратор' ? (
                                            <DefaultLayout>
                                                <CreateDocumentType title="Добавить новый тип документа" />
                                            </DefaultLayout>
                                        ) : (
                                            <Page404 />
                                        )
                                    }
                                />
                                <Route path="/documents" element={<Navigate to="/documents/documents-in" />} />
                                <Route
                                    path="/documents/detail/:id"
                                    element={
                                        <DefaultLayout>
                                            <DocumentDetail />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/documents/documents-out"
                                    element={
                                        <DefaultLayout>
                                            <DocumentOut />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/documents/documents-out/edit/:id"
                                    element={
                                        <DefaultLayout>
                                            <CreateDocument
                                                title="Редактировать документ"
                                                documentIn={false}
                                                path="documents-out"
                                            />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/documents/documents-out/create"
                                    element={
                                        <DefaultLayout>
                                            <CreateDocument
                                                title="Добавить новый документ"
                                                documentIn={false}
                                                path="documents-out"
                                            />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/documents/documents-in"
                                    element={
                                        <DefaultLayout>
                                            <DocumentIn />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/documents/documents-in/edit/:id"
                                    element={
                                        <DefaultLayout>
                                            <CreateDocument
                                                title="Редактировать документ"
                                                documentIn={true}
                                                path="documents-in"
                                            />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/documents/documents-in/create"
                                    element={
                                        <DefaultLayout>
                                            <CreateDocument
                                                title="Добавить новый документ"
                                                documentIn={true}
                                                path="documents-in"
                                            />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <DefaultLayout>
                                            <Profile />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/tasks"
                                    element={
                                        <DefaultLayout>
                                            <Tasks />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/tasks/detail/:id"
                                    element={
                                        <DefaultLayout>
                                            <AdminTaskDetail />
                                            <MemberTaskDetail />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/tasks/create"
                                    element={
                                        <DefaultLayout>
                                            <CreateTask title="Добавить новые задачи" />
                                        </DefaultLayout>
                                    }
                                />
                                <Route
                                    path="/tasks/edit/:id"
                                    element={
                                        <DefaultLayout>
                                            <CreateTask title="Редактировать задачу" />
                                        </DefaultLayout>
                                    }
                                />
                            </>
                        ) : (
                            <Route path="*" element={<BlockPage />} />
                        )}
                    </Route>
                    <Route path="*" element={<Page404 />} />
                    <Route path="/" element={<Navigate to="/signin" />} />
                </Routes>
            </Router>
        </AvatarContext.Provider>
    );
};

export default App;
