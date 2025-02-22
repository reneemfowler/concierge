import { Route, Session } from 'front-end/lib/app/types';
import { View } from 'front-end/lib/framework';
import Link from 'front-end/lib/views/link';
import { get } from 'lodash';
import React from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Spinner } from 'reactstrap'
import { UserType } from 'shared/lib/types';

interface Props {
  isOpen: boolean;
  activeRoute: Route;
  session?: Session;
  toggleIsOpen(open?: boolean): void;
}

const ContextualLinks: View<Props & { className?: string }> = ({ activeRoute, session, toggleIsOpen, className = '' }) => {
  const isMyProfileRoute = activeRoute.tag === 'userView' && activeRoute.value.profileUserId === get(session, ['user', 'id']);
  const isUserListRoute = activeRoute.tag === 'userList';
  const isRequestForInformationListRoute = activeRoute.tag === 'requestForInformationList';
  const isLandingRoute = activeRoute.tag === 'landing';
  const activeClass = (active: boolean) => active ? 'font-weight-bold text-decoration-underline' : '';
  const onClick = () => toggleIsOpen(false);
  const linkClassName = (isActive: boolean) => `${activeClass(isActive)} text-white px-0 px-md-3`;
  const landingRoute: Route = { tag: 'landing', value: null };
  const rfiListRoute: Route = { tag: 'requestForInformationList', value: null };
  const userListRoute: Route = { tag: 'userList', value: null };
  if (!session || !session.user) {
    return (
      <Nav navbar className={className}>
        <NavItem>
          <Link nav route={landingRoute} className={linkClassName(isLandingRoute)} onClick={onClick}>Home</Link>
        </NavItem>
        <NavItem>
          <Link nav route={rfiListRoute} className={linkClassName(isRequestForInformationListRoute)} onClick={onClick}>RFIs</Link>
        </NavItem>
      </Nav>
    );
  }
  const myProfileRoute: Route = {
    tag: 'userView',
    value: {
      profileUserId: session.user.id
    }
  };
  switch (session.user.type) {
    case UserType.Buyer:
      return (
        <Nav navbar className={className}>
          <NavItem>
            <Link nav route={landingRoute} className={linkClassName(isLandingRoute)} onClick={onClick}>Home</Link>
          </NavItem>
          <NavItem>
            <Link nav route={rfiListRoute} className={linkClassName(isRequestForInformationListRoute)} onClick={onClick}>RFIs</Link>
          </NavItem>
          <NavItem>
            <Link nav route={myProfileRoute} className={linkClassName(isMyProfileRoute)} onClick={onClick}>My Profile</Link>
          </NavItem>
        </Nav>
      );
    case UserType.Vendor:
      return (
        <Nav navbar className={className}>
          <NavItem>
            <Link nav route={landingRoute} className={linkClassName(isLandingRoute)} onClick={onClick}>Home</Link>
          </NavItem>
          <NavItem>
            <Link nav route={rfiListRoute} className={linkClassName(isRequestForInformationListRoute)} onClick={onClick}>RFIs</Link>
          </NavItem>
          <NavItem>
            <Link nav route={myProfileRoute} className={linkClassName(isMyProfileRoute)} onClick={onClick}>My Profile</Link>
          </NavItem>
        </Nav>
      );
    case UserType.ProgramStaff:
      return (
        <Nav navbar className={className}>
          <NavItem>
            <Link nav route={landingRoute} className={linkClassName(isLandingRoute)} onClick={onClick}>Home</Link>
          </NavItem>
          <NavItem>
            <Link nav route={rfiListRoute} className={linkClassName(isRequestForInformationListRoute)} onClick={onClick}>RFIs</Link>
          </NavItem>
          <NavItem>
            <Link nav route={userListRoute} className={linkClassName(isUserListRoute)} onClick={onClick}>Users</Link>
          </NavItem>
          <NavItem>
            <Link nav route={myProfileRoute} className={linkClassName(isMyProfileRoute)} onClick={onClick}>My Profile</Link>
          </NavItem>
        </Nav>
      );
  }
};

const AuthLinks: View<Props> = ({ session, toggleIsOpen }) => {
  const onClick = () => toggleIsOpen(false);
  if (session && session.user) {
    const signOutRoute: Route = {
      tag: 'signOut',
      value: null
    };
    return (
      <Nav navbar className='ml-md-auto'>
        <NavItem className='d-none d-md-block'>
          <Link nav color='white' className='px-0 px-md-3' disabled>{session.user.email}</Link>
        </NavItem>
        <NavItem>
          <Link nav route={signOutRoute} color='white' onClick={onClick} className='px-0 pl-md-3'>Sign Out</Link>
        </NavItem>
      </Nav>
    );
  } else {
    const signInRoute: Route = { tag: 'signIn', value: {} };
    const signUpRoute: Route = { tag: 'signUp', value: null };
    return (
      <Nav navbar className='ml-md-auto'>
        <NavItem>
          <Link nav route={signInRoute} color='white' onClick={onClick} className='px-0 px-md-3'>Sign In</Link>
        </NavItem>
        <NavItem>
          <Link button route={signUpRoute} color='info-alt' onClick={onClick} className='mt-2 mt-md-0'>Sign Up</Link>
        </NavItem>
      </Nav>
    );
  }
};

// Computed height of main nav.
// May need to be updated if the main nav height changes.
const MAIN_NAVBAR_HEIGHT = '64px';

const Navigation: View<Props> = props => {
  return (
    <div className='position-sticky' style={{ top: `-${MAIN_NAVBAR_HEIGHT}`, zIndex: 1000 }}>
      <Navbar expand='md' dark color='primary' className='navbar border-bottom-gov'>
        <Container className='px-sm-3'>
          <NavbarBrand href='/'>
            <img src='/images/logo.svg' style={{ height: '2rem' }} alt='Procurement Concierge Program' />
          </NavbarBrand>
          <Spinner size='sm' color='info' className='transition-indicator d-md-none' />
          <NavbarToggler className='ml-auto' onClick={() => props.toggleIsOpen()} />
          <Collapse isOpen={props.isOpen} className='py-3 py-md-0' navbar>
            <ContextualLinks {...props} className='d-md-none' />
            <AuthLinks {...props} />
          </Collapse>
        </Container>
      </Navbar>
      <Navbar expand='sm' className='bg-info d-none d-md-block shadow border-bottom'>
        <Container className='pl-0 d-flex justify-content-between'>
          <ContextualLinks {...props} />
          <Spinner size='sm' color='primary' className='transition-indicator' />
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
