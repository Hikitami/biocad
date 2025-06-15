import css from './aminoAcidForm.module.scss';
import { useCheckAminoAcid } from './hook/useCheckAminoAcid';
import { Input, Button } from '../../shared';

const AminoAcidForm = () => {
  const {
    checkValue,
    register,
    handleSubmit,
    onSubmit,
    errors,
    watch,
    open,
    setOpen
  } = useCheckAminoAcid();

  const firstPair = watch('firstPair') || '';
  const secondPair = watch('secondPair') || '';

  return (
    <div className={css.acid}>
      <form className={css.acidCalcCalc} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputs}>
          <Input
            label="Первый набор аминокислот"
            placeholder="ARNDCEQGHILKMFPSTWYV-"
            type="text"
            register={register('firstPair', {
              required: 'Это поле обязательно',
              pattern: {
                value: /^[ARNDCEQGHILKMFPSTWYV-]+$/,
                message: 'Неверная последовательность аминокислот',
              },
              onChange: (e) => {
                const value = e.target.value.toUpperCase().replace(/[^ARNDCEQGHILKMFPSTWYV-]/g, '');

                e.target.value = value.toUpperCase();
                // Если второй инпут длиннее, обрезаем его
                if (secondPair && secondPair.length > value.length) {
                  e.target.value = value.slice(0, secondPair.length);
                }
                setOpen(false)
              },
            })}
            error={errors.firstPair}
          />
          <Input
            label="Второй набор аминокислот"
            placeholder="ARNDCEQGHILKMFPSTWYV-"
            type="text"
            register={register('secondPair', {
              required: 'Это поле обязательно',
              pattern: {
                value: /^[ARNDCEQGHILKMFPSTWYV-]+$/,
                message: 'Неверная последовательность аминокислот',
              },
              onChange: (e) => {
                const value = e.target.value.toUpperCase().replace(/[^ARNDCEQGHILKMFPSTWYV-]/g, '');

                e.target.value = value.toUpperCase();

                if (firstPair && value.length > firstPair.length) {
                  e.target.value = value.slice(0, firstPair.length);
                }
                
                setOpen(false)
              },
              validate: (value) => {
                if (!firstPair) return true;
                return value.length === firstPair.length || 'Длина второго поля должна совпадать с первым';
              },
            })}
            error={errors.secondPair}
          />
        </div>
        <Button
          type={"submit"}
          text={"Сравнить"}
        />
        {open && (
          <div className={css.output}>
            {firstPair && firstPair.split('').map((item, i) => {
              const secondItem = checkValue?.[i];
              return (
                <div key={i} className={css.letterPair}>
                  <span className={css.letter}>{item}</span>
                  {secondItem && <span key={i} className={css.letter} style={{ backgroundColor: secondItem.background || "inherit" }}>{secondItem.value}</span>}
                </div>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

export default AminoAcidForm;
