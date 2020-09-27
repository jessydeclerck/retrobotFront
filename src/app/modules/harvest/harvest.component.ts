import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Jobs} from "../../shared/enums/jobs.enum";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../root-store";
import {ScriptStoreActions, ScriptStoreSelectors} from "../../root-store/script-store";
import {combineLatest, Observable} from "rxjs";
import {take} from "rxjs/operators";
import {DataService} from "../../shared/services/data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {LoadedScript} from "../../shared/models/loaded-script";
import {MatExpansionPanel} from "@angular/material/expansion";

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.scss']
})
export class HarvestComponent implements OnInit {

  public jobs = Jobs;

  public selectedResources=[];

  scriptName$: Observable<string> = this.store.select(ScriptStoreSelectors.selectScriptName);

  charName$: Observable<string> = this.store.select(ScriptStoreSelectors.selectCharacterName);

  loadedScripts$: Observable<LoadedScript[]> = this.store.select(ScriptStoreSelectors.selectLoadedScripts);

  @ViewChild('expansionPanel') expansionPanel : MatExpansionPanel;

  public script$ = combineLatest([
    this.store.select(ScriptStoreSelectors.selectToGather),
    this.store.select(ScriptStoreSelectors.selectBankMap),
    this.store.select(ScriptStoreSelectors.selectStartMap),
    this.store.select(ScriptStoreSelectors.selectGatherPath),
    this.store.select(ScriptStoreSelectors.selectBankPath),
    this.store.select(ScriptStoreSelectors.selectCharacterName),
    this.store.select(ScriptStoreSelectors.selectScriptName)
  ]);

  constructor(private readonly store: Store<RootStoreState.State>,
              private readonly data: DataService,
            private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  useScript() {
    this.script$
      .pipe(take(1))
      .subscribe(([toGather, bankMap, startMap, gatherPath, bankPath, charName, scriptName]) => {
          this.data.useScript(toGather, bankMap, startMap, gatherPath, bankPath, charName, scriptName);
      });
  }

  exportFile() {
    this.script$
      .pipe(take(1))
      .subscribe(([toGather, bankMap, startMap, gatherPath, bankPath, charName, scriptName]) => {
        this.data.exportScript(toGather, bankMap, startMap, gatherPath, bankPath, charName, scriptName);
      });
  }

  onImport(event) {
    const file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        if (typeof evt.target.result === "string") {
         const parsedScript = JSON.parse(evt.target.result);
          const script: LoadedScript = new class implements LoadedScript {
            data: any;
            characterName: string;
            scriptName: string;
          };
          script.scriptName = file.name.split('.json')[0];
          script.data = parsedScript.displayData;
          script.characterName = parsedScript.characterName;
          this.store.dispatch(ScriptStoreActions.loadScript({script}));
          this.expansionPanel.close();
        }
      }
      reader.onerror = function (evt) {
        console.log('error reading file');
      }
    }
  }


  newScriptName(newName): void {
    this.store.dispatch(ScriptStoreActions.changeScriptName({newName}));
  }

  newCharName(newName): void {
    this.store.dispatch(ScriptStoreActions.changeCharacterName({newName}))
  }

  public loadScript(script: LoadedScript): void {
    this.store.dispatch(ScriptStoreActions.loadScript({script}));
    this.expansionPanel.close();
  }

}
