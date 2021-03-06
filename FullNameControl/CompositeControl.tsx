import * as React from 'react';
import { TextField, Callout, Stack, Label, PrimaryButton, DirectionalHint } from 'office-ui-fabric-react';

export interface IName {
    firstName: string;
    middleName: string;
    lastName: string;
}

export interface ICompositeControlProps extends IName {
    fullName: string;
    firstNameLabel: string;
    middleNameLabel: string;
    lastNameLabel: string;
    onNameChanged: (name: IName) => void;
}

interface ICompositeControlState extends IName {
    isCalloutVisible: boolean
}

export default class CompositeControl extends React.Component<ICompositeControlProps, ICompositeControlState>{

    constructor(props: ICompositeControlProps) {
        super(props);

        this.state = {
            isCalloutVisible: false,
            firstName: props.firstName,
            middleName: props.middleName,
            lastName: props.lastName
        };
    }

    private _menuButtonElement = React.createRef<HTMLDivElement>();

    private showPopup = () => {
        this.setState({
            isCalloutVisible: true
        });
    }

    private hidePopup = () => {
        this.setState({
            isCalloutVisible: false
        });
    }

    private onNameChanged = () => {
        const name: IName = {
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName
        };

        this.props.onNameChanged(name);
    }

    render() {
        return (
            <>
                <div ref={this._menuButtonElement}>
                    <TextField
                        value={this.props.fullName}
                        readOnly={true}
                        onClick={this.showPopup}
                        placeholder={"---"}
                    />
                    {this.state.isCalloutVisible && (
                        <Callout
                            target={this._menuButtonElement.current}
                            onDismiss={this.hidePopup}
                            directionalHint={DirectionalHint.rightCenter}
                        >
                            <Stack horizontal>
                                <Stack tokens={{childrenGap: 14, padding: 10}}>
                                    <Label>{this.props.firstNameLabel}</Label>
                                    <Label>{this.props.middleNameLabel}</Label>
                                    <Label>{this.props.lastNameLabel}</Label>
                                </Stack>
                                <Stack tokens={{ childrenGap: 10, padding: 10 }}>
                                    <TextField
                                        value={this.state.firstName}
                                        placeholder={"---"}
                                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                            this.setState({
                                                firstName: newValue ?? ""
                                            }, this.onNameChanged);
                                        }}
                                    />
                                    <TextField
                                        value={this.state.middleName}
                                        placeholder={"---"}
                                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                            this.setState({
                                                middleName: newValue ?? ""
                                            }, this.onNameChanged);
                                        }}
                                    />
                                    <TextField
                                        value={this.state.lastName}
                                        placeholder={"---"}
                                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                            this.setState({
                                                lastName: newValue ?? ""
                                            }, this.onNameChanged);
                                        }}
                                    />
                                    <PrimaryButton
                                        text={"Done"}
                                        onClick={this.hidePopup}
                                    />
                                </Stack>
                            </Stack>
                        </Callout>
                    )}
                </div>
            </>
        );
    }
}