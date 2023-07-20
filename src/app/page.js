"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Confirmation, Button, DatePicker, Count, Input, DropdownCity } from "@/components";

export default function Home() {
  const [counts, setCounts] = useState([
    { title: "Adultos", count: 0 },
    { title: "Crianças", count: 0 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const totalCount = counts.reduce((sum, count) => sum + count.count, 0);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const dateInitial = watch("initialdate");
  const cityInitial = watch("origin");
  const adult = watch("Adultos");

  const onSubmit = async () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("preventScroll");
    } else {
      document.body.classList.remove("preventScroll");
    }
  }, [showModal]);

  return (
    <>
      <header className="header">
        <h1>Faça seu Checkout</h1>
        <h2>É fácil, é tecnológico, isso é futurismo!</h2>
      </header>
      <main className="main | container">
        {showModal && <Confirmation setShowModal={setShowModal} />}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <DatePicker
            datei={register("initialdate", { required: true })}
            setValue={setValue}
            datef={register("finaldate", {
              required: true,
              validate: (value) =>
                value !== dateInitial || "Escolha uma data de volta diferente.",
            })}
            errors={errors}
          />
          <DropdownCity
            label="Origem"
            registername="origin"
            setValue={setValue}
            {...register("origin", { required: true })}
            errors={errors}
          />
          <DropdownCity
            label="Destino"
            registername="destiny"
            {...register("destiny", {
              required: true,
              validate: (value) =>
                value !== cityInitial || "Escolha um destino diferente.",
            })}
            setValue={setValue}
            errors={errors}
            reset={reset}
          />
          <h3>
            <strong>◌</strong> Informações dos passageiros
          </h3>
          <div className="count">
            {counts.map((count) => (
              <Count
                key={count.title}
                title={count.title}
                counts={counts}
                setValue={setValue}
                setCounts={setCounts}
                {...register(count.title, {
                  validate: () => adult > 0 && totalCount > 0,
                })}
                errors={errors}
              />
            ))}
            <ul className="count__info">
              <li className="count__info__total">
                <p>Total</p>
                <span>{totalCount}</span>
              </li>
              <div>
                <li className="count__single">
                  <p>
                    <strong>◌</strong> {counts[0].count} Adultos
                  </p>
                </li>
                <li className="count__single">
                  <p>
                    <strong>◌</strong> {counts[1].count} Crianças
                  </p>
                </li>
              </div>
            </ul>
            <span
              className="error__input"
              style={{ placeSelf: "center", textAlign: "center" }}
            >
              {errors["Adultos"] &&
                "Necessário pelo menos um adulto como passageiro."}
            </span>
          </div>
          <Input
            placeholder="Insira seu nome"
            type="text"
            label="Nome Completo"
            name="namecomplete"
            {...register("namecomplete", { required: true })}
            newclass={`${errors.namecomplete ? "error" : ""}`}
            errors={errors}
          />
          <Input
            placeholder="email@contato.com"
            type="email"
            label="E-mail"
            name="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Insira um e-mail válido",
              },
            })}
            newclass={`${errors.email ? "error" : ""}`}
            errors={errors}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </main>
    </>
  );
}
