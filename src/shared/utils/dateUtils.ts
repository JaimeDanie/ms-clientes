export class DateUtils{
    public static dateNow():Date{
        const dateZone = new Date().toLocaleString("en-US", { timeZone: "America/Bogota" });
        const splitDateTime = dateZone.split(',');
        const splitDate = splitDateTime[0].split('/')
        return new Date(Number(splitDate[2]),Number(splitDate[0])-1,Number(splitDate[1]))
    }
}