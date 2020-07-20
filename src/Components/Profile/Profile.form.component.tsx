import React, { FunctionComponent, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ROUTES from '../../Constants/routes';
import { useUser } from '../../Contexts/user.context';
import Firebase from '../../Firebase/firebase';
import { Profile } from '../../Models/profile.models';
import { useProfile } from '../../Contexts/profile.context';
import { navigate } from '@reach/router';
import './Profile.form.component.css';
import { stringify } from 'querystring';
type Props = {
  firebase: Firebase;
};
const ProfileFormComponent: FunctionComponent<Props> = ({ firebase }) => {
  const { user } = useUser();
  const { profile, setProfile } = useProfile();
  const [error, setError] = useState<string>();
  const { register, handleSubmit, errors, formState } = useForm<Profile>();

  const onSubmit = (data: Profile) => {
    if (!Object.keys(errors).length) {
      firebase
        .getUsers()
        .doc(user.uid)
        .set(data, { merge: true })
        .then(
          (docRef) => {
            setProfile(data);
            navigate(ROUTES.HOME);
          },
          (error: Error) => setError(error.message)
        );
    }
  };

  return (
    <div className="container">
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
                <li key={index} className="row">
                  <span className="column column-30">{danceName}</span>

                  <span className="row">
                    <label htmlFor={danceName}>Lead</label>
                    <input
                      type="checkbox"
                      ref={register}
                      id={danceName}
                      defaultChecked={positionsObj.lead}
                      name={`dances.${danceName}.lead`}
                    />
                  </span>
                  <span className="row">
                    <label htmlFor={danceName}>Follow</label>
                    <input
                      type="checkbox"
                      ref={register}
                      id={danceName}
                      defaultChecked={positionsObj.follow}
                      name={`dances.${danceName}.follow`}
                    />
                  </span>
                </li>
              );
            })}
        </ul>
        <button type="submit">Update</button>
      </form>
      {Object.keys(errors).length &&
        console.log(errors, ' errors in form comp')}
      {error && <p>{error}</p>}
    </div>
  );
};
export default ProfileFormComponent;
