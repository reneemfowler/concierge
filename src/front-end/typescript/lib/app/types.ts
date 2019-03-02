import { AppMsg, Immutable } from 'front-end/lib/framework';
import { Session } from 'front-end/lib/http/api';
import * as PageChangePassword from 'front-end/lib/pages/change-password';
import * as PageLanding from 'front-end/lib/pages/landing';
import * as PageNoticeChangePassword from 'front-end/lib/pages/notice/change-password';
import * as PageNoticeNotFound from 'front-end/lib/pages/notice/not-found';
import * as PageSignIn from 'front-end/lib/pages/sign-in';
import * as PageSignOut from 'front-end/lib/pages/sign-out';
import * as PageSignUpBuyer from 'front-end/lib/pages/sign-up/buyer';
import * as PageSignUpProgramStaff from 'front-end/lib/pages/sign-up/program-staff';
import * as PageSignUpVendor from 'front-end/lib/pages/sign-up/vendor';
import { ADT } from 'shared/lib/types';

export type Page
  = ADT<'landing', PageLanding.Params>
  | ADT<'signIn', null>
  | ADT<'signUpBuyer', PageSignUpBuyer.Params>
  | ADT<'signUpVendor', PageSignUpVendor.Params>
  | ADT<'signUpProgramStaff', PageSignUpProgramStaff.Params>
  | ADT<'signOut', null>
  | ADT<'changePassword', null>
  | ADT<'settings', null>
  | ADT<'userList', null>
  | ADT<'requestForInformationList', null>
  | ADT<'noticeNotFound', PageNoticeNotFound.Params>
  | ADT<'noticeChangePassword', PageNoticeChangePassword.Params>;

export interface State {
  ready: boolean;
  isNavOpen: boolean;
  session?: Session;
  activePage: Page;
  pages: {
    landing?: Immutable<PageLanding.State>;
    signIn?: Immutable<PageSignIn.State>;
    signUpBuyer?: Immutable<PageSignUpBuyer.State>;
    signUpVendor?: Immutable<PageSignUpVendor.State>;
    signUpProgramStaff?: Immutable<PageSignUpProgramStaff.State>;
    signOut?: Immutable<PageSignOut.State>;
    changePassword?: Immutable<PageChangePassword.State>;
    noticeNotFound?: Immutable<PageNoticeNotFound.State>;
    noticeChangePassword?: Immutable<PageNoticeChangePassword.State>;
  };
}

type InnerMsg
  = ADT<'toggleIsNavOpen', boolean | undefined >
  | ADT<'pageLanding', PageLanding.Msg>
  | ADT<'pageSignIn', PageSignIn.Msg>
  | ADT<'pageSignUpBuyer', PageSignUpBuyer.Msg>
  | ADT<'pageSignUpVendor', PageSignUpVendor.Msg>
  | ADT<'pageSignUpProgramStaff', PageSignUpProgramStaff.Msg>
  | ADT<'pageSignOut', PageSignOut.Msg>
  | ADT<'pageChangePassword', PageChangePassword.Msg>
  | ADT<'pageNoticeNotFound', PageNoticeNotFound.Msg>
  | ADT<'pageNoticeChangePassword', PageNoticeChangePassword.Msg>;

export type Msg = AppMsg<InnerMsg, Page>;
