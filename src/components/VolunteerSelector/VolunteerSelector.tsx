import React from 'react';
import { useForm } from 'react-hook-form';

type Developer = {
  id: string;
  name: string;
};

const generateRandoNumber = (min: number, max: number) => Math.floor(Math.random() * max) + min;

const VolunteerSelector = () => {
  const [initialList, setInitialList] = React.useState<Developer[]>([]);
  const [confirmedList, setConfirmedList] = React.useState<Developer[]>([]);
  const [randomDeveloper, setRandomDeveloper] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, reset } = useForm({ defaultValues: { newDevName: '' } });

  const onSubmit = (values: any) => {
    const isDuplicated = initialList.find((d) => d.name === values.newDevName);
    if (values.newDevName && !isDuplicated) {
      const newDev = { id: `${initialList.length}`, name: values.newDevName };

      setInitialList([...initialList, newDev]);
      reset();
    }
  };

  const selectPerson = () => {
    setIsLoading(true);
    setRandomDeveloper('');
    const randomNumber = generateRandoNumber(0, initialList.length - 1);

    // TODO: handle timeout id
    setTimeout(() => {
      // find random person
      const randomDev = initialList.find((developer, idx) => idx === randomNumber);
      setRandomDeveloper(randomDev?.name);
      //  update confirmed list
      const newInitialList = initialList.filter((developer, idx) => idx !== randomNumber);
      setInitialList(newInitialList);
      // update initial list
      if (randomDev) {
        setConfirmedList([...confirmedList, randomDev]);
      }
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div>
      <h1>Volunteer selector</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="newDevName" defaultValue="" ref={register} />
        <button type="submit">Add person</button>
      </form>
      <div className="initial-list">
        <ul>
          {initialList.map((developer) => (
            <li key={developer.id}>{developer.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <button type="button" onClick={() => selectPerson()}>
          Random selector
        </button>
      </div>
      <hr />
      {isLoading && <div>And the person gonna be ....</div>}
      <div>{!!randomDeveloper && <h2>{randomDeveloper} has been voluntold</h2>}</div>
      <hr />
      <div>
        <ul className="confirmed-list">
          {confirmedList.map((developer) => (
            <li key={developer.id}>{developer.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerSelector;
