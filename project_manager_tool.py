import tkinter as tk
from tkinter import messagebox, simpledialog, ttk, filedialog
import json
import os

"""
Project Management Tool - Version 1.0
------------------------------------
Faida:
- Simamia miradi mingi na kazi ndani ya kila mradi.
- Ongeza, hariri, futa miradi na kazi.
- Taarifa ya status (Pending, In Progress, Completed).
- Hifadhi data kwenye file na ibebe (save/load) kwa urahisi.
- Interface rahisi ya kutumia kwa Kompyuta.
- Tool hii ni safi na inaweza kutumika moja kwa moja kwa biashara ndogo au mtu binafsi.
------------------------------------
Jinsi ya kuitumia:
1. Endesha script hii na Python 3 (hakikisha tkinter imewekwa).
2. Tumia button za ku-Add Project kuongeza miradi mipya.
3. Chagua mradi kisha ongeza kazi ndani ya mradi huo.
4. Badilisha status ya kazi au futa kazi/miradi.
5. Hifadhi kazi zako kwa kubonyeza Save, au fungua file ya kazi zilizohifadhiwa kwa kubonyeza Load.
------------------------------------
"""

class ProjectManagerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Project Management Tool")

        # Data structure: {project_name: [{task}, ...], ...}
        self.projects = {}

        # Setup GUI
        self.setup_gui()

    def setup_gui(self):
        # Frames
        self.left_frame = tk.Frame(self.root)
        self.left_frame.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=10)

        self.right_frame = tk.Frame(self.root)
        self.right_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10, pady=10)

        # Projects Listbox
        tk.Label(self.left_frame, text="Miradi").pack()
        self.project_listbox = tk.Listbox(self.left_frame, width=30, height=20)
        self.project_listbox.pack()
        self.project_listbox.bind('<<ListboxSelect>>', self.on_project_select)

        # Project Buttons
        tk.Button(self.left_frame, text="Ongeza Mradi", command=self.add_project).pack(pady=5)
        tk.Button(self.left_frame, text="Futa Mradi", command=self.delete_project).pack(pady=5)
        tk.Button(self.left_frame, text="Hifadhi Miradi (Save)", command=self.save_projects).pack(pady=5)
        tk.Button(self.left_frame, text="Fungua Miradi (Load)", command=self.load_projects).pack(pady=5)

        # Tasks Section
        tk.Label(self.right_frame, text="Kazi za Mradi").pack()
        columns = ("Task", "Status")
        self.task_tree = ttk.Treeview(self.right_frame, columns=columns, show='headings')
        self.task_tree.heading("Task", text="Kazi")
        self.task_tree.heading("Status", text="Hali")
        self.task_tree.pack(fill=tk.BOTH, expand=True)

        # Task Buttons
        btn_frame = tk.Frame(self.right_frame)
        btn_frame.pack(pady=10)

        tk.Button(btn_frame, text="Ongeza Kazi", command=self.add_task).grid(row=0, column=0, padx=5)
        tk.Button(btn_frame, text="Hariri Kazi", command=self.edit_task).grid(row=0, column=1, padx=5)
        tk.Button(btn_frame, text="Futa Kazi", command=self.delete_task).grid(row=0, column=2, padx=5)
        tk.Button(btn_frame, text="Badilisha Status", command=self.change_status).grid(row=0, column=3, padx=5)

    def add_project(self):
        pname = simpledialog.askstring("Ongeza Mradi", "Andika jina la mradi:")
        if pname:
            if pname in self.projects:
                messagebox.showerror("Hitilafu", "Mradi huu tayari umepo.")
            else:
                self.projects[pname] = []
                self.project_listbox.insert(tk.END, pname)

    def delete_project(self):
        selected = self.project_listbox.curselection()
        if not selected:
            messagebox.showwarning("Tahadhari", "Chagua mradi kwanza.")
            return
        pname = self.project_listbox.get(selected)
        if messagebox.askyesno("Thibitisha", f"Unataka kufuta mradi '{pname}'?"):
            self.project_listbox.delete(selected)
            del self.projects[pname]
            self.task_tree.delete(*self.task_tree.get_children())

    def on_project_select(self, event):
        selected = self.project_listbox.curselection()
        if not selected:
            return
        pname = self.project_listbox.get(selected)
        self.show_tasks(pname)

    def show_tasks(self, pname):
        self.task_tree.delete(*self.task_tree.get_children())
        for task in self.projects.get(pname, []):
            self.task_tree.insert("", tk.END, values=(task["name"], task["status"]))

    def add_task(self):
        selected = self.project_listbox.curselection()
        if not selected:
            messagebox.showwarning("Tahadhari", "Chagua mradi kwanza.")
            return
        pname = self.project_listbox.get(selected)
        tname = simpledialog.askstring("Ongeza Kazi", "Andika jina la kazi:")
        if tname:
            task = {"name": tname, "status": "Pending"}
            self.projects[pname].append(task)
            self.show_tasks(pname)

    def edit_task(self):
        selected_proj = self.project_listbox.curselection()
        selected_task = self.task_tree.selection()
        if not selected_proj or not selected_task:
            messagebox.showwarning("Tahadhari", "Chagua kazi na mradi kwanza.")
            return
        pname = self.project_listbox.get(selected_proj)
        t_index = self.task_tree.index(selected_task)
        tname = simpledialog.askstring("Hariri Kazi", "Andika jina jipya la kazi:")
        if tname:
            self.projects[pname][t_index]["name"] = tname
            self.show_tasks(pname)

    def delete_task(self):
        selected_proj = self.project_listbox.curselection()
        selected_task = self.task_tree.selection()
        if not selected_proj or not selected_task:
            messagebox.showwarning("Tahadhari", "Chagua kazi na mradi kwanza.")
            return
        pname = self.project_listbox.get(selected_proj)
        t_index = self.task_tree.index(selected_task)
        if messagebox.askyesno("Thibitisha", "Unataka kufuta kazi hii?"):
            self.projects[pname].pop(t_index)
            self.show_tasks(pname)

    def change_status(self):
        selected_proj = self.project_listbox.curselection()
        selected_task = self.task_tree.selection()
        if not selected_proj or not selected_task:
            messagebox.showwarning("Tahadhari", "Chagua kazi na mradi kwanza.")
            return
        pname = self.project_listbox.get(selected_proj)
        t_index = self.task_tree.index(selected_task)
        current_status = self.projects[pname][t_index]["status"]
        options = ["Pending", "In Progress", "Completed"]
        try:
            new_status = simpledialog.askstring("Badilisha Status", f"Hali ya sasa: {current_status}\nAndika status mpya: Pending, In Progress, Completed")
            if new_status and new_status in options:
                self.projects[pname][t_index]["status"] = new_status
                self.show_tasks(pname)
            else:
                messagebox.showerror("Hitilafu", "Tafadhali chagua status sahihi.")
        except Exception as e:
            messagebox.showerror("Hitilafu", f"Imeshindikana: {e}")

    def save_projects(self):
        filepath = filedialog.asksaveasfilename(defaultextension=".json", filetypes=[("JSON files","*.json")])
        if not filepath:
            return
        try:
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(self.projects, f, indent=4)
            messagebox.showinfo("Ufanisi", f"Miradi imehifadhiwa kwenye {filepath}")
        except Exception as e:
            messagebox.showerror("Hitilafu", f"Imeshindikana kuhifadhi: {e}")

    def load_projects(self):
        filepath = filedialog.askopenfilename(filetypes=[("JSON files","*.json")])
        if not filepath:
            return
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                self.projects = json.load(f)
            self.project_listbox.delete(0, tk.END)
            for pname in self.projects.keys():
                self.project_listbox.insert(tk.END, pname)
            self.task_tree.delete(*self.task_tree.get_children())
            messagebox.showinfo("Ufanisi", f"Miradi imefunguliwa kutoka {filepath}")
        except Exception as e:
            messagebox.showerror("Hitilafu", f"Imeshindikana kufungua: {e}")

if __name__ == "__main__":
    root = tk.Tk()
    app = ProjectManagerApp(root)
    root.mainloop()
