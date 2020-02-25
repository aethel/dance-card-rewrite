import React, { FunctionComponent, Fragment } from "react";
import { useForm } from "react-hook-form";
import * as ROUTES from '../../Constants/routes'
import { useUser } from "../../Contexts/user.context";
import Firebase from "../../Firebase/firebase";
import { Profile } from "../../Models/profile.models";
import { useProfile } from "../../Contexts/profile.context";
import { navigate } from "@reach/router";

type Props = {
  firebase: Firebase;
};
const ProfileFormComponent: FunctionComponent<Props> = ({ firebase }) => {
  const { user } = useUser();
  const { profile, setProfile } = useProfile();
  const { register, handleSubmit, errors, formState } = useForm<Profile>();

  const onSubmit = (data: Profile) => {
    if (!Object.keys(errors).length) {
      firebase
        .getUsers()
        .doc(user.uid)
        .set(data, { merge: true })
        .then(
          docRef => {
            setProfile(data);
            navigate(ROUTES.HOME)
          },
          error => console.log(error)
        );
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>Profile</legend>
        <ul>
          <li>
            <label>
              User name
              <input
                type="text"
                defaultValue={profile.username}
                placeholder="username"
                name="username"
                ref={register}
              />
            </label>
          </li>
          <li>
            <label>
              email
              <input
                type="email"
                defaultValue={profile.email}
                placeholder="email"
                name="email"
                ref={register}
              />
            </label>
          </li>
          <li>
            <label>
              Active
              <input
                type="checkbox"
                defaultChecked={profile.active}
                ref={register}
                name="active"
              />
            </label>
          </li>
          {!!Object.keys(profile).length &&
            Object.entries(profile.dances).map((dance: any, index: number) => {
              const danceName: string = dance[0];
              const positionsObj: any = dance[1];
              return (
                <li key={index}>
                  {danceName}
                  <label>
                    Lead
                    <input
                      type="checkbox"
                      ref={register}
                      defaultChecked={positionsObj.lead}
                      name={`dances.${danceName}.lead`}
                    />
                  </label>
                  <label>
                    Follow
                    <input
                      type="checkbox"
                      ref={register}
                      defaultChecked={positionsObj.follow}
                      name={`dances.${danceName}.follow`}
                    />
                  </label>
                </li>
              );
            })}
        </ul>
        <button type="submit">Update</button>
      </form>
      {errors && console.log(errors)}
    </Fragment>
  );
};
export default ProfileFormComponent;
