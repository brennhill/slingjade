package com.slingjade.engine;

import java.io.InputStream;
import java.io.SequenceInputStream;
import java.util.Dictionary;
import java.util.Iterator;

import javax.jcr.RepositoryException;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;

import org.apache.commons.lang.time.StopWatch;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.commons.osgi.PropertiesUtil;

import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Created by brenn on 4/26/15.
 */
@Component
@Service(value = javax.script.ScriptEngineFactory.class)
public abstract class JadeScriptEngine implements ScriptEngineFactory {

    /** default log */
    private final Logger log = LoggerFactory.getLogger(JadeScriptEngine.class);

    public final static String HBS_SCRIPT_EXTENSION = "hbs";

    public final static String HANDLEBARS_SCRIPT_EXTENSION = "handlebars";

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    private static String LANGUAGE_VERSION="1.0";
    private static String LANGUAGE_NAME="Jade";

    public ScriptEngine getScriptEngine() {
        return null;
    }

    public String getLanguageVersion() {
        return LANGUAGE_VERSION;
    }

    public String getLanguageName() {
        return LANGUAGE_NAME;
    }

}
