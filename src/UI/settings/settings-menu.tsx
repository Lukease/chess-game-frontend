import React, {Component} from "react";
import {UserService} from "../../backend-service-connector/service";
import {EditUserInformation} from "./edit-user-information";
import {UserAbout} from "./user-about";

export class SettingsMenu extends Component<any, any> {
    userService: UserService

    constructor(props: any) {
        super(props)

        this.userService = props.userService
    }

    render() {
        return (
            <UserSettings userService={this.userService}/>
        )
    }
}

function UserSettings(props: any) {

    return (
        <div className={'settings'}>
            <div className={'settings__nav'}>
                <UserAbout userService={props.userService}/>
                <EditUserInformation userService={props.userService}/>
                <a className={'settings__nav--escape'} href={'/game'}>X</a>
            </div>
        </div>
    )
}