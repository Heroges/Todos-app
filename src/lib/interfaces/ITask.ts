type typesTaskStatus = "Активные" | "Завершенные" | "Удаленные"

export interface ITask {
    id: number;
    name: string;
    description: string;
    status: typesTaskStatus;
    createdAt: Date;
    updatedAt: Date;
}