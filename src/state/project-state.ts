import { Project, ProjectStatus } from '../models/project.js';

// Project State Management
// Project State の内側でイベントリスナーを管理する
type Listener<T> = (item: T[]) => void;
class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {super();}

    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title:string, description:string, manday:number){
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            manday,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newState: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if(project && project.status !== newState) {
            project.status = newState;
            this.updateListeners();
        }
    }

    updateListeners() {
        for(const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();