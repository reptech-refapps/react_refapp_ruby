import * as React from 'react';
import { IconButton, AppBar, Toolbar, Typography, CssBaseline, Avatar, Switch } from '@mui/material';
import Person from '@mui/icons-material/Person';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import LogoIcon from "assets/logo.png";
import { Image } from 'components';
import TimerSession from 'shared/useTimerSession';

const Component = ({ open, onDrawerClicked }) => {
    const [themeType, setThemeType] = React.useState(false);
    const [themeName, setThemeName] = React.useState("Dark");
    const [newTheme] = TimerSession("themeName");

    const onSwitchChanged = (e) => {
        const tTheme = !themeType;
        const tType = themeType ? "Light" : "Dark";
        const tThemeName = themeType ? "Dark" : "Light";
        setThemeType(tTheme);
        setThemeName(tThemeName);
        sessionStorage.setItem('theme', tType);
        sessionStorage.setItem('themeName', tThemeName);
    }

    React.useEffect(() => {
        if (newTheme !== themeName) setThemeName(newTheme);
    }, [newTheme]);

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => onDrawerClicked()}>
                        {!open ? <MenuIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    <Image sx={{ width: 40, height: 40, mr: 2 }} alt="logo" src={LogoIcon} />
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        XYZ Company
                    </Typography>
                    <Typography noWrap>{themeName}</Typography><Switch onChange={onSwitchChanged} checked={themeName} label="Light"></Switch>
                    <Typography variant="avatar" noWrap component="div" sx={{ marginRight: 1 }}>Welcome! User</Typography>
                    <Avatar
                        style={{ cursor: "pointer" }}
                    ><Person />
                    </Avatar>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Component;
