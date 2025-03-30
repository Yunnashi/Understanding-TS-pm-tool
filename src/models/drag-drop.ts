// Drag & Drop
export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
    dragOverHandler(event: DragEvent): void; // ドロップできるエリアかどうかを判定
    dropHandler(event: DragEvent): void; // ドロップされた時の処理
    dragLeaveHandler(event: DragEvent): void;  // ドラッグがキャンセルされたときの処理
}