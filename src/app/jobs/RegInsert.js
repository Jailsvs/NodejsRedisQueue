import Mail from '../lib/Mail';

export default {
    key: 'RegistrationInsert',
    async handle ({data}){
        const {user} = data;

    await Mail.sendMail({
        from: 'Queue Test <jailsvs@gmail.com>',
        to: `${user.name} <${user.email}>`,
        subject: 'Inserts efetuados',
        html: `Olá, ${user.name}, bem-vindo ao sistema de filas dos Inserts :D`
    });
    //enviar email
    },
}